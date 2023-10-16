using iBAS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class RoleMasterController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // RoleMaster Maker
        public ActionResult ListOfRoles()
        {
            try
            {
                logerror("ListOfRoles Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;


                logerror("ListOfRoles Action", "Ending");
                return View();
            }
            catch (Exception ex)
            {
                logerror("ListOfRoles Action Catch", ex.Message);
                return View();
            }
        }

        public ActionResult CreateRole()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public ActionResult EditRole(int id)
        {
            try
            {
                logerror("EditRole Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("EditRole Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult DeleteRole(int id)
        {
            try
            {
                logerror("DeleteRole Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("DeleteRole Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        //Role Master Checker

        public ActionResult ListOfRolesChecker()
        {
            try
            {
                logerror("ListOfRolesChecker Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                //string loginid = Session["uid"].ToString();
                //string checkerRights = Session["reasonmasterchecker"].ToString();
                //checkerInputdata.uid = loginid;
                //checkerInputdata.checkerrights = checkerRights;

                logerror("ListOfRolesChecker Action", "Ending");
                return View();
            }
            catch (Exception ex)
            {
                logerror("ListOfRolesChecker Action Catch", ex.Message);
                return View();
            }
        }

        public ActionResult RoleCreateChecker(int id)// For creation request accept and reject
        {
            try
            {
                logerror("RoleCreateChecker Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("RoleCreateChecker Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }

        }

        public ActionResult RoleEditChecker(int id)// for edit request accept and reject
        {
            try
            {
                logerror("RoleEditChecker Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("RoleEditChecker Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult RoleDeleteChecker(int id)// for delete request accept and reject
        {
            try
            {
                logerror("RoleDeleteChecker Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("RoleDeleteChecker Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }

        public ActionResult Detials(int id)
        {
            try
            {
                logerror("Detials Action", "Start");
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.Id = id;
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View();
            }
            catch (Exception e)
            {
                logerror("Detials Action Catch", e.Message);
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = e.Message });
            }
        }
        private void logerror(string errormsg, string errordesc)
        {
            ErrorDisplay er = new ErrorDisplay();
            string ServerPath = "";
            string filename = "";
            string fileNameWithPath = "";
            //FormsAuthentication.SignOut();


            //ViewBag.Error = e.InnerException;

            //-------------------------------- ServerPath = Server.MapPath("~/Logs/");----
            ServerPath = Server.MapPath("~/Logs/");
            if (System.IO.Directory.Exists(ServerPath) == false)
            {
                System.IO.Directory.CreateDirectory(ServerPath);
            }
            filename = DateTime.Now.ToString("yyyyMMdd") + "Logs.txt";
            fileNameWithPath = ServerPath + filename;
            System.IO.StreamWriter str = new System.IO.StreamWriter(fileNameWithPath, true, System.Text.Encoding.Default);
            //  str.WriteLine("hello");
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": Exception: " + errormsg);
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": StackTrace: " + errordesc);
            str.Close();
        }
    }
}