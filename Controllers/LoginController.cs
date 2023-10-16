using iBAS.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login(string val = null)
        {
            //TempData[""]
            Session["Access_Token"] = null;
            Session["User_Id"] = null;
            Session["Login_Page_Id"] = null;
            Session["UserId_PrimaryKey"] = null;

            var SessionValue = AESEncrytDecry.RandomString(16); //Aniket
            //Session["sessionVal"] = "1245659800260489";
            Session["sessionVal"] = SessionValue.ToString(); //Aniket

            if (val == "Password Set")
            {
                ViewBag.Message = "Password Reset Successful";
                return View();
            }
            else if (val == "Password Change")
            {
                ViewBag.Message = "Password Change Successful";
                return View();
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public ActionResult Login(LoginVM m)
        {
            string user = "";
            string userpass = "";

            try
            {
                var key = Request.Form["sess"];
                var lname = Request.Form["yes1"];
                var passNew = Request.Form["yes2"];

                var decryptedUserName = AESEncrytDecry.DecryptStringAES(lname, key);
                string dUserName = decryptedUserName.ToString();
                m.loginid = dUserName;

                var decryptedPassword = AESEncrytDecry.DecryptStringAES(passNew, key);
                string dPassword = decryptedPassword.ToString();
                m.password = dPassword;

                if (m.loginid != null && m.password != null)
                {
                    string pass = EncryptPassword(m.password);
                    var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                    using (var con = new NpgsqlConnection(cs))
                    {
                        con.Open();

                        string sql = "SELECT id,User_Id,User_Pass,sessionid FROM ibas_webapi_login  where User_Id= '" + m.loginid + "' and User_Pass = '" + pass + "' ";

                        using (var cmd = new NpgsqlCommand(sql, con))
                        {
                            using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    user = rdr["User_Id"].ToString();
                                    userpass = rdr["User_Pass"].ToString();
                                    Session["user"] = user.ToString();
                                    Session["uid"] = rdr["id"].ToString();
                                    Session["sessionId"] = rdr["sessionid"].ToString();
                                    // Session["PhysicalImageURL"] = rdr["PhysicalImageURL"].ToString(); //13/02/2022
                                }
                                Session["login"] = true;
                                Session["password"] = m.password;
                                //if (Session["sessionId"].ToString() != Session.SessionID)
                                //{
                                Session["userlogin"] = false;
                                //}
                            }
                        }

                        if (user != "" && userpass != "")
                        {
                            Session["Login_Page_Id"] = user.ToString();
                            return RedirectToAction("Index", "Main");
                        }
                        else
                        {
                            TempData["ErrorMessage"] = "Please enter valid Username and Password";
                            return RedirectToAction("Login", "Login");
                        }
                    }
                }
                else
                {
                    TempData["ErrorMessage"] = "Username or Password cannot be null";
                    ModelState.Clear();
                    return RedirectToAction("Login", "Login");
                }

                return View();
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        public string EncryptPassword(string Password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(Password);
            byte[] hash = sha256.ComputeHash(bytes);
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            var pass = result.ToString();
            return pass;

        }

    }
}