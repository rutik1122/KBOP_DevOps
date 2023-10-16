using iBAS.Models;
//using iBAS.Models.DbModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
//using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Npgsql;
using NpgsqlTypes;
using System.Net;
using System.Xml;
using System.Text.RegularExpressions;
using System.DirectoryServices.AccountManagement;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Web.Security;
using System.Net.NetworkInformation;
using System.Net.Http.Headers;
using WebGrease.Activities;

namespace iBAS.Controllers
{
    public class HomeController : Controller
    {
        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();
        //NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString); //Postgresql
        string cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;


        // [HandleError]
        public ActionResult Index()
        {
            try
            {
                if(Convert.ToString(Session["user"]) == null || Convert.ToString(Session["user"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                ViewBag.URL = urlString;
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home");
            }
            //ViewBag.URL = urlString;
            //return View();

        }

        public ActionResult UserManagement()
        {
            ViewBag.URL = urlString;
            return View("UserManagement");
        }

        public ActionResult Login()
        {
            ViewBag.URL = urlString;
            return View("Login");
        }
        
        public ActionResult LoginiBAS(int cond = 0, string msg = null)
        {
            //return RedirectToAction("Login", "Login");

            if (cond != 0)
            {
                ViewBag.condition = cond.ToString();
                if (msg == null || msg == "")
                    msg = "no msg";
                
                ViewBag.exception = msg.ToString();
            }

            if (cond == 1)
                TempData["ErrorMessage"] = "Session Expired !";

            else if (cond == 2)
                TempData["ErrorMessage"] = "Exception Occured! " + msg;

            else if (cond == 3)
                TempData["SuccessMessage"] = "Password Reset Successful";

            else if (cond == 4)
            {
                //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                TempData["ErrorMessage"] = "Alert! Malicious activity detected! UserId has been desabled!";
                string sqlDisable = "UPDATE ibas_usermaster SET active=0 WHERE id=" + Convert.ToInt32(Session["uid"]);

                DbModel dbModel = new DbModel();
                string resp = dbModel.GetUpdateCount(cs, sqlDisable);
            }

            else if (cond == 5)
            {
                TempData["ErrorMessage"] = "Alert! " + msg;
            }

            Session["Login_Page_Id"] = null;

            var SessionValue = AESEncrytDecry.RandomString(16); //Aniket
            //Session["sessionVal"] = "1245659800260489";
            Session["sessionVal"] = SessionValue.ToString(); //Aniket

            //return View();
            return View("LoginPage");
        }

        public ActionResult Deposit(string Name = null)
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View();
        }

        public ActionResult Cashwithdraw()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View("Cashwithdraw");
        }
        public ActionResult Cashdeposit()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View("Cashdeposit");
        }

        public ActionResult Chequedeposit()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View("Chequedeposit");
        }
        public ActionResult Register()
        {
            ViewBag.URL = urlString;
            return View("Register");
        }
        public ActionResult SearchOld()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View("SearchOld");
        }

        public ActionResult SearchTest()
        {
            return View();
        }

        public ActionResult Search()
        {
            try
            {
                if (Session["Login_Page_Id"] == null)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (Convert.ToBoolean(Session["search"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

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

        public ActionResult SOD(string Name = null)
        {
            try
            {

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (Convert.ToBoolean(Session["sod"]) == false && Name == "SOD")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                if (Convert.ToBoolean(Session["eod"]) == false && Name == "EOD")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                if (Name == "SOD")
                {
                    ViewBag.TitleName = "SOD";
                    ViewBag.SubName = "Start Of Day";
                }
                else if (Name == "EOD")
                {
                    ViewBag.TitleName = "Currency Chest";
                    ViewBag.SubName = "CC";
                }

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View("SOD");
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public ActionResult PrinterMaster()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

            if (Convert.ToBoolean(Session["printermapping"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View("PrinterMaster");
        }

        public ActionResult MappingMaster()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View("MappingMaster");
        }

        public ActionResult Updateprinterdetails()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View("PrinterMaster");
        }

        public ActionResult FileDownload()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if(Convert.ToBoolean(Session["filedownload"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                return View("FileDownload");
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
            
        }

        public ActionResult BranchReconcilation()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
            return View("BranchReconcilation");
        }

        public ActionResult Reconsile_Record()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;
           // ViewBag.PhysicalImageURL = Session["PhysicalImageURL"]; //13/02/2022
            return View("Reconsile_Record");
        }


        [HttpPost]
        public async Task<ActionResult> LoginiBAS(LoginVM lvm)
        {
            try
            {
                //logerror("This is post method login", "Begin");

                var key = Request.Form["sess"];  //from 152 to 162 Aniket's code
                var lname = Request.Form["yes1"];
                var passNew = Request.Form["yes2"];
                //var FormIp = Request.Form["yes3"];

                //var lname = Session["yes1"].ToString();
                //var passNew = Session["yes2"].ToString();

                var decryptedUserName = AESEncrytDecry.DecryptStringAES(lname, key);
                string dUserName = decryptedUserName.ToString();
                lvm.loginid = dUserName;

                var decryptedPassword = AESEncrytDecry.DecryptStringAES(passNew, key);
                string dPassword = decryptedPassword.ToString();
                lvm.password = dPassword;

                if (lvm.loginid == null || lvm.password == null)
                {
                    TempData["ErrorMessage"] = "Username or Password cannot be null";
                    return RedirectToAction("LoginiBAS", "Home");
                }
                else
                {
                    //// IP Address
                    //var decryptedIpAddress = AESEncrytDecry.DecryptStringAES(FormIp, key);
                    //string Ip_Address = decryptedIpAddress.ToString();
                    //Session["IpAddress"] = Ip_Address;

                    string user = "";
                    string pass = EncryptPassword(lvm.password);

                    //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                    //string sqlLogin = "Select id,sessionid,pgp_sym_decrypt(password,'ibas123') as passwd, lastlogin, invalidpasswordattempts, "
                    //        + "active, userdeleted, loginflg, firstlogin, usertype, accesslevel, roleid, l2startlimit, l2stoplimit, l3startlimit, l3stoplimit "
                    //        + "from ibas_usermaster where loginid='" + lvm.loginid + "'";

                    //get_userby_loginid

                    string sqlLogin = "begin; select get_userby_loginid('" + lvm.loginid + "','ibas123')";

                    DbModel loginData = new DbModel();
                    DataSet dsLogin = loginData.GetDataSetFromSP(cs, sqlLogin);

                    if (dsLogin.Tables.Count > 0 && dsLogin.Tables[0].Rows.Count > 0)
                    {
                        string userType = Convert.ToString(dsLogin.Tables[0].Rows[0]["usertype"]).ToUpper();

                        user = lvm.loginid;

                        string dataPass = Convert.ToString(dsLogin.Tables[0].Rows[0]["passwd"]);

                        if (Convert.ToString(dsLogin.Tables[0].Rows[0]["userdeleted"]) == "1")
                        {
                            TempData["ErrorMessage"] = "LoginId is deleted!";
                            return RedirectToAction("LoginiBAS", "Home");
                        }

                        if (Convert.ToString(dsLogin.Tables[0].Rows[0]["active"]) != "1")
                        {
                            TempData["ErrorMessage"] = "LoginId is Inactive!";
                            return RedirectToAction("LoginiBAS", "Home");
                        }

                        string Ad_Login = "N";
                        string domainName = null;

                        // Ad authentication
                        //string sqlAd = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='ADAuthentication'";
                        string sqlAd = "select adauthentication, domainname from ibas_settings";
                        DataSet dsAd = loginData.GetDataSet(cs, sqlAd);

                        if (dsAd.Tables.Count > 0 && dsAd.Tables[0].Rows.Count > 0)
                        {
                            Ad_Login = Convert.ToString(dsAd.Tables[0].Rows[0]["adauthentication"]).ToUpper();
                            domainName = Convert.ToString(dsAd.Tables[0].Rows[0]["domainname"]);
                        }

                        Session["uid"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["id"]);
                        Session["Login_Page_Id"] = user;

                        Session["sessionId"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["sessionid"]);

                        Session["LoginFlag"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["loginflg"]);

                        Session["UserType"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["usertype"]).ToUpper();
                        Session["AccessLevel"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["accesslevel"]).ToUpper();
                        Session["RoleId"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["roleid"]);

                        // Function for role - Aniket
                        Session["UserMaster_id"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["id"]);

                        Session["user"] = user.ToLower();

                        Session["login"] = true;
                        //Session["password"] = lvm.password;
                        Session["userlogin"] = false;

                        bool InvalidPass = false;

                        //if ((userType == "BANK_USER" || userType == "TELLER_USER" || userType == "TELLER" || userType == "ADMIN") && Ad_Login == "Y")
                        if (userType != "DEVELOPER" && Ad_Login == "Y")
                        {
                            logerror("AD Login", "------------ Start ------------");
                            string bankcode = System.Configuration.ConfigurationManager.AppSettings["BCode"].ToString();

                            logerror("AD Login", "BankCode:" + bankcode);
                            // user04 - AU Authentication
                            if (bankcode == "765")
                            {
                                AD_Authentication adl = new AD_Authentication();
                                DbModel db = new DbModel();

                                string sql = "SELECT * FROM ibas_apisettings WHERE bankcode = '" + bankcode + "'";
                                DataSet ds = db.GetDataSet(cs, sql);

                                logerror("AD Login", "ibas_settings called");

                                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                                {
                                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                                    {
                                        string apiname = Convert.ToString(ds.Tables[0].Rows[i]["apiname"]);
                                        //if (apiname == "au_userid")
                                        //    adl.userid = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                                        //else if (apiname == "au_password")
                                        //    adl.Password = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                                        if (apiname == "au_channel")
                                            adl.Channel = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                                        else if (apiname == "ad_url")
                                            adl.Ad_url = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                                    }
                                }

                                adl.UserID = lvm.loginid;
                                adl.Password = lvm.password;

                                //logerror("AD Login", "url : " + adl.Ad_url);
                                //logerror("AD Login", "Channel : " + adl.Channel);
                                //logerror("AD Login", "userid : " + adl.UserID);
                                //logerror("AD Login", "Password : " + adl.Password);

                                bool resp = AD_Authentication(adl);

                                //logerror("AD Login", "AD_Authentication function response");

                                if (resp == false)
                                {
                                    //logerror("AD Login", "AD_Authentication function failed");
                                    //logerror("AD Login", "AD_Authentication Error Response: " + resp);

                                    TempData["ErrorMessage"] = "AD Authentication Failed!";
                                    return RedirectToAction("LoginiBAS", "Home");
                                }
                            }
                            else
                            {
                                using (PrincipalContext pc = new PrincipalContext(ContextType.Domain, domainName))
                                {
                                    bool isValid = pc.ValidateCredentials(lvm.loginid, lvm.password);
                                    if (isValid == false)
                                    {
                                        string sqlVendorCode = "UPDATE ibas_usermaster SET vendorcode='INVALID' WHERE id=" + Convert.ToInt32(Session["uid"]);
                                        string resp = loginData.GetUpdateCount(cs, sqlVendorCode);

                                        TempData["ErrorMessage"] = "Invalid Username Or Password!";
                                        return RedirectToAction("LoginiBAS", "Home");
                                    }
                                }
                            }
                        }
                        else if (dataPass == lvm.password)
                        {
                            user = lvm.loginid;
                            Session["user_currentPassword"] = dataPass;

                            if (Convert.ToString(dsLogin.Tables[0].Rows[0]["firstlogin"]) == "1")
                                return RedirectToAction("ResetPassword");
                        }
                        else
                            InvalidPass = true;

                        //logerror("LoginiBas", "Before invalid password attempts");

                        if (InvalidPass == true)
                        {
                            int invalidPassCount = Convert.ToInt32(dsLogin.Tables[0].Rows[0]["invalidpasswordattempts"]);
                            invalidPassCount++;

                            bool val = InvalidPassword(invalidPassCount, Convert.ToString(Session["uid"]), cs);

                            return RedirectToAction("LoginiBAS", "Home");
                        }


                        // Checker module L2
                        string sqlChecker = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='CheckerModule'";
                        DataSet dsCheck = loginData.GetDataSet(cs, sqlChecker);

                        if (dsCheck.Tables.Count > 0 && dsCheck.Tables[0].Rows.Count > 0)
                            Session["CheckerModule"] = Convert.ToString(dsCheck.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["CheckerModule"] = "N";

                        // Checker module L3
                        string sqlChecker_L3 = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='CheckerModule_L3'";
                        DataSet dsCheck_L3 = loginData.GetDataSet(cs, sqlChecker_L3);

                        if (dsCheck_L3.Tables.Count > 0 && dsCheck_L3.Tables[0].Rows.Count > 0)
                            Session["CheckerModule_L3"] = Convert.ToString(dsCheck_L3.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["CheckerModule_L3"] = "N";

                        // PAN Card Verfication
                        string sqlPanVerf = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='PanValidation'";
                        DataSet dsPan = loginData.GetDataSet(cs, sqlPanVerf);

                        if (dsPan.Tables.Count > 0 && dsPan.Tables[0].Rows.Count > 0)
                            Session["Pancard_Verf"] = Convert.ToString(dsPan.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["Pancard_Verf"] = "N";

                        // Account No Minimum length requirements
                        string sqlAccMin = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='AccNoMinLength'";
                        DataSet dsAccMin = loginData.GetDataSet(cs, sqlAccMin);

                        if (dsAccMin.Tables.Count > 0 && dsAccMin.Tables[0].Rows.Count > 0)
                            Session["AccNoMinLength"] = Convert.ToString(dsAccMin.Tables[0].Rows[0]["settingvalue"]);
                        else
                            Session["AccNoMinLength"] = "5";

                        // Account No Maximum length requirements
                        string sqlAccMax = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='AccNoMaxLength'";
                        DataSet dsAccMax = loginData.GetDataSet(cs, sqlAccMax);

                        if (dsAccMax.Tables.Count > 0 && dsAccMax.Tables[0].Rows.Count > 0)
                            Session["AccNoMaxLength"] = Convert.ToString(dsAccMax.Tables[0].Rows[0]["settingvalue"]);
                        else
                            Session["AccNoMaxLength"] = "16";

                        // Editable_Checker
                        string sqlEditableChecker = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='Editable_Checker'";
                        DataSet dsEditableChecker = loginData.GetDataSet(cs, sqlEditableChecker);

                        if (dsEditableChecker.Tables.Count > 0 && dsEditableChecker.Tables[0].Rows.Count > 0)
                            Session["Editable_Checker"] = Convert.ToString(dsEditableChecker.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["Editable_Checker"] = "N";

                        // Account Balance 
                        string sqlAccBalance = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='AccBalanceValidation'";
                        DataSet dsAccBalance = loginData.GetDataSet(cs, sqlAccBalance);
                        
                        if (dsAccBalance.Tables.Count > 0 && dsAccBalance.Tables[0].Rows.Count > 0)
                            Session["AccBalanceValidation"] = Convert.ToString(dsAccBalance.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["AccBalanceValidation"] = "N";

                        // NRE Flag Check
                        string sqlNreFlag = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='NRE_Flag'";
                        DataSet dsNreFlag = loginData.GetDataSet(cs, sqlNreFlag);

                        if (dsNreFlag.Tables.Count > 0 && dsNreFlag.Tables[0].Rows.Count > 0)
                            Session["NRE_Flag"] = Convert.ToString(dsNreFlag.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["NRE_Flag"] = "N";

                        // Dot function call for Account No
                        string sqlDotAccNo = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='DotAccNo'";
                        DataSet dsDotAccNo = loginData.GetDataSet(cs, sqlDotAccNo);

                        if (dsDotAccNo.Tables.Count > 0 && dsDotAccNo.Tables[0].Rows.Count > 0)
                            Session["DotAccNo"] = Convert.ToString(dsDotAccNo.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["DotAccNo"] = "N";

                        if(Convert.ToString(Session["DotAccNo"]).ToUpper() == "Y")
                        {
                            // Dot function call for Account No - DotA
                            string sqlDotA = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='DotA'";
                            DataSet dsDotA = loginData.GetDataSet(cs, sqlDotA);

                            if (dsDotA.Tables.Count > 0 && dsDotA.Tables[0].Rows.Count > 0)
                                Session["DotA"] = Convert.ToString(dsDotA.Tables[0].Rows[0]["settingvalue"]);
                            else
                                Session["DotA"] = "4";

                            // Dot function call for Account No - DotB
                            string sqlDotB = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='DotB'";
                            DataSet dsDotB = loginData.GetDataSet(cs, sqlDotB);

                            if (dsDotB.Tables.Count > 0 && dsDotB.Tables[0].Rows.Count > 0)
                                Session["DotB"] = Convert.ToString(dsDotB.Tables[0].Rows[0]["settingvalue"]);
                            else
                                Session["DotB"] = "3";

                            // Dot function call for Account No - DotC
                            string sqlDotC = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='DotC'";
                            DataSet dsDotC = loginData.GetDataSet(cs, sqlDotC);

                            if (dsDotC.Tables.Count > 0 && dsDotC.Tables[0].Rows.Count > 0)
                                Session["DotC"] = Convert.ToString(dsDotC.Tables[0].Rows[0]["settingvalue"]);
                            else
                                Session["DotC"] = "9";

                            // Session TimeOut in Mins
                            string sqlSessionTime = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='Session_Time_Min'";
                            DataSet dsSessionTime = loginData.GetDataSet(cs, sqlSessionTime);

                            if (dsSessionTime.Tables.Count > 0 && dsSessionTime.Tables[0].Rows.Count > 0)
                                Session["SessionLimit"] = Convert.ToString(dsSessionTime.Tables[0].Rows[0]["settingvalue"]);
                            else
                                Session["SessionLimit"] = "20";

                        }
                        else
                        {
                            Session["DotA"] = "4";
                            Session["DotA"] = "3";
                            Session["DotA"] = "9";
                        }

                        // Dot function call for Account No
                        string sqlRollback = "SELECT * FROM ibas_commonsettings WHERE appname='IBASCONFIG' AND settingname='Rollback'";
                        DataSet dsRollback = loginData.GetDataSet(cs, sqlRollback);

                        if (dsRollback.Tables.Count > 0 && dsRollback.Tables[0].Rows.Count > 0)
                            Session["RollbackCall"] = Convert.ToString(dsRollback.Tables[0].Rows[0]["settingvalue"]).ToUpper();
                        else
                            Session["RollbackCall"] = "N";

                        //logerror("LoginiBAS", "CommonSettings data read");

                        // Organization mapping
                        string userorgmapping_sql = "SELECT * FROM ibas_userorgmapping WHERE active=1 and userid=" + Convert.ToInt32(Session["uid"]);
                        DataSet org_map = loginData.GetDataSet(cs, userorgmapping_sql);

                        if (org_map.Tables.Count > 0 && org_map.Tables[0].Rows.Count > 0)
                        {
                            int orgId = Convert.ToInt32(org_map.Tables[0].Rows[0]["organizationid"]);

                            string org_master = "SELECT * FROM ibas_organizationmaster WHERE id=" + orgId;
                            DataSet org_mast = loginData.GetDataSet(cs, org_master);

                            if (org_mast.Tables.Count > 0 && org_mast.Tables[0].Rows.Count > 0)
                            {
                                Session["BankCode"] = Convert.ToString(org_mast.Tables[0].Rows[0]["code"]);
                                Session["BankName"] = Convert.ToString(org_mast.Tables[0].Rows[0]["name"]);
                            }
                            else
                            {
                                TempData["ErrorMessage"] = "Alert! Unable to find bankcode!";
                                return RedirectToAction("LoginiBAS", "Home");
                            }

                            // maker checker start limit
                            string makercheckerlimit = "SELECT * FROM ibas_makercheckerlimit WHERE bankcode='" + Session["BankCode"].ToString() + "'";
                            DataSet ds_startlimit = loginData.GetDataSet(cs, makercheckerlimit);

                            if (ds_startlimit.Tables[0].Rows.Count > 0)
                            {
                                Session["l1startlimit"] = Convert.ToString(ds_startlimit.Tables[0].Rows[0]["l1startlimit"]);
                                Session["l2startlimit"] = Convert.ToString(ds_startlimit.Tables[0].Rows[0]["l2startlimit"]);
                                Session["l3startlimit"] = Convert.ToString(ds_startlimit.Tables[0].Rows[0]["l3startlimit"]);
                                Session["pancard_verf_limit"] = Convert.ToString(ds_startlimit.Tables[0].Rows[0]["pancard_verf_limit"]);
                                Session["alter_color"] = Convert.ToString(ds_startlimit.Tables[0].Rows[0]["alter_data_color"]);
                            }
                            else
                            {
                                Session["l1startlimit"] = "0";
                                Session["l2startlimit"] = "50001";
                                Session["l3startlimit"] = "500001";
                                Session["pancard_verf_limit"] = "50000";
                                Session["alter_color"] = "FDFA1A";
                            }
                        }
                        else
                        {
                            TempData["ErrorMessage"] = "Alert! Login user customer mapping is incomplete!";
                            return RedirectToAction("LoginiBAS", "Home");
                        }

                        logerror("LoginiBAS", "CommonSettings data read");

                        // Checker Limit
                        Session["CheckerStartLimit"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["l2startlimit"]);
                        Session["CheckerStopLimit"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["l2stoplimit"]);
                        Session["CheckerStartLimit_l3"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["l3startlimit"]);
                        Session["CheckerStopLimit_l3"] = Convert.ToString(dsLogin.Tables[0].Rows[0]["l3stoplimit"]);

                        logerror("LoginiBAS", "Role Mapping started");

                        // Branch Name
                        string brname = "";
                        var brcode = " ";

                        string brSql = "select branchid from ibas_userbranchmapping where active=1 and userid=" + Convert.ToInt32(Session["uid"]) + " order by id desc";
                        DataSet bdDS = loginData.GetDataSet(cs, brSql);
                        
                        if (bdDS.Tables.Count > 0 && bdDS.Tables[0].Rows.Count > 0)
                        {
                            for (int i = 0; i < bdDS.Tables[0].Rows.Count; i++)
                            {
                                if (brname == "" || brname == null)
                                {
                                    int brid = Convert.ToInt32(bdDS.Tables[0].Rows[i]["branchid"]);
                                    string brNameSql = "select * from ibas_branchmaster where id=" + brid;
                                    DataSet ds = loginData.GetDataSet(cs, brNameSql);
                                    if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                                    {
                                        brname = Convert.ToString(ds.Tables[0].Rows[0]["name"]);
                                        brcode = Convert.ToString(ds.Tables[0].Rows[0]["code"]);

                                        break;
                                    }
                                }
                                else
                                    break;
                            }
                        }

                        if (brname == "" || brname == null)
                        {
                            Session["BranchName"] = "NoName";
                            Session["BranchCode"] = "000";
                        }
                        else
                        {
                            Session["BranchName"] = brname;
                            //Session["BranchCode1"] = brcode1;
                            Session["BranchCode"] = brcode;
                        }
                        // Fetch Role
                        if (Convert.ToString(Session["RoleId"]) != null && Convert.ToString(Session["RoleId"]) != "")
                        {
                            string sqlRole = "select * from ibas_rolemaster where id=" + Convert.ToInt32(Session["RoleId"]);

                            DbModel dbModel = new DbModel();
                            DataSet ds = dbModel.GetDataSet(cs, sqlRole);

                            logerror("LoginiBAS", "Data from Role Master table");

                            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                            {
                                int active = Convert.ToInt32(ds.Tables[0].Rows[0]["active"]);

                                if (active == 1)
                                {
                                    //if (Convert.ToInt32(ds.Tables[0].Rows[0]["sod"]) == 0 || Convert.ToInt32(ds.Tables[0].Rows[0]["sod"]) == 2)
                                    //    Session["sod"] = false;
                                    //else
                                    //    Session["sod"] = true;

                                    Session["sod"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["sod"]);
                                    Session["eod"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["eod"]);
                                    // Cash Withdrawal
                                    Session["cashwithdrawalmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashwithdrawalmaker"]);
                                    Session["cashwithdrawalchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashwithdrawalchecker"]);
                                    // Cash Deposit
                                    Session["cashdepositmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashdepositmaker"]);
                                    Session["cashdepositchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashdepositchecker"]);
                                    // CTS
                                    Session["ctsmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["ctsmaker"]);
                                    Session["ctschecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["ctschecker"]);
                                    // Transfer
                                    Session["transfermaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["transfermaker"]);
                                    Session["transferchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["transferchecker"]);
                                    // RTGS
                                    Session["rtgsmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["rtgsmaker"]);
                                    Session["rtgschecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["rtgschecker"]);
                                    // Printer Mapping
                                    Session["printermapping"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["printermapping"]);
                                    // Search
                                    Session["search"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["search"]);
                                    // Instrument Upload
                                    Session["formupload"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["formupload"]);
                                    // CTS File Download
                                    Session["filedownload"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["filedownload"]);
                                    // Branch Reconcilation
                                    Session["branchreconcilation"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["branchreconcilation"]);
                                    // Dash board
                                    Session["dashboard"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["dashboard"]);
                                    // Role Master
                                    Session["rolemaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["rolemaker"]);
                                    Session["rolechecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["rolechecker"]);
                                    // User Management
                                    Session["usermanagementmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["usermanagementmaker"]);
                                    Session["usermanagementchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["usermanagementchecker"]);
                                    // Cash Exchange
                                    Session["cashexchangemaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashexchangemaker"]);
                                    Session["cashexchangechecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["cashexchangechecker"]);
                                    // NRO Form
                                    Session["nromaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["nromaker"]);
                                    Session["nrochecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["nrochecker"]);
                                    // Third Party Form
                                    Session["thirdpartymaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["thirdpartymaker"]);
                                    Session["thirdpartychecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["thirdpartychecker"]);
                                    // Branch Master
                                    Session["branchmastermaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["branchmastermaker"]);
                                    Session["branchmasterchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["branchmasterchecker"]);
                                    // Reason Master
                                    Session["reasonmastermaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["reasonmastermaker"]);
                                    Session["reasonmasterchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["reasonmasterchecker"]);
                                    // Common Setting Master
                                    Session["commonsettingmastermaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["commonsettingmastermaker"]);
                                    Session["commonsettingmasterchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["commonsettingmasterchecker"]);
                                    //Credit intimation
                                    Session["creditintimationmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["creditintimationmaker"]);
                                    Session["creditintimationchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["creditintimationchecker"]);
                                    //Debit intimation
                                    Session["debitintimationmaker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["debitintimationmaker"]);
                                    Session["debitintimationchecker"] = Convert.ToBoolean(ds.Tables[0].Rows[0]["debitintimationchecker"]);
                                }
                                else
                                {
                                    TempData["ErrorMessage"] = "Alert! The Role Assigned to the user is Disabled!";
                                    return RedirectToAction("LoginiBAS", "Home");
                                }
                            }
                            else
                            {
                                TempData["ErrorMessage"] = "Alert! Please define proper role to " + Convert.ToString(Session["Login_Page_Id"]) + " user id!";
                                return RedirectToAction("LoginiBAS", "Home");
                            }


                        }

                        logerror("LoginiBAS", "Role Mapping completed");

                        //User04 --starts
                        k_bop_api model = new k_bop_api();
                        //string result = await get_k_bop_api_details(model);
                        k_bop_api result = await get_k_bop_api_details(model);
                        if (result.errorMsg == null)
                        {
                            Session["k_bop_tok"] = result.access_token;
                            Session["k_bop_token_type"] = result.token_type;
                            Session["k_bop_expires_in"] = result.expires_in;
                            Session["KVal"] = result.Encryption_Key;
                        }
                        else
                        {
                            return RedirectToAction("LoginiBAS", "Home", new { cond = 5, msg = result.errorMsg });
                        }
                        //User04 --ends

                        //Session["Login_Page_Id"]
                        FormsAuthentication.SetAuthCookie(Session["Login_Page_Id"].ToString(), false);

                        //HttpContext.Session.Timeout = 2;

                        // user02 - Begin (Cookie Management)

                        foreach (string s in Response.Cookies.AllKeys)
                        {
                            if (s == FormsAuthentication.FormsCookieName || s.ToLower() == "asp.net_sessionid")
                            {
                                Response.Cookies[s].Secure = true;
                                //Response.Cookies[s].Path = ConfigurationManager.AppSettings["ApplicationVirtualPath"].ToString() ?? "/ikloudProAxis";
                            }
                        }

                        // user02 - End


                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        TempData["ErrorMessage"] = "Please enter valid Username and Password";
                        return RedirectToAction("LoginiBAS", "Home");
                    }

                }
            }
            catch (Exception ex)
            {
                logerror("Exception caught in Login Post method", ex.Message + " -> Exception Message");
                string err = ex.ToString();
                Session["err"] = err;
                Session["user"] = "NoName";
                return RedirectToAction("Catchex", "Error");
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

        public void setSession()
        {
            try
            {
                var Id = Session["uid"];
                var sessionid = Session.SessionID;
                //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                DbModel dbModel = new DbModel();
                var SessionValue = AESEncrytDecry.RandomStringSessionId(24);

                Session["SessionId"] = SessionValue.ToString();

                string time = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
                string sql = "UPDATE ibas_usermaster SET sessionid='" + SessionValue + "', active=1, invalidpasswordattempts=0, loginflg=1, lastlogin='" + time + "' "
                    + "WHERE id=" + Convert.ToInt32(Id);

                string respSession = dbModel.GetUpdateCount(cs, sql);

                string IpAddress = GetIP();

                //logerror("IP Address Old", "----------------------- Ip Old: " + IpAddress + " -----------------------");

                ////IPAddress desktopIPAddress = GetDesktopIPAddress();
                //IPAddress clientIPAddress = GetClientIPAddress();
                //string ip = "";

                //if (clientIPAddress != null)
                //    ip = clientIPAddress.ToString();
                //else
                //    ip = "NO IP";

                //logerror("IP Address", "----------------------- Ip: " + ip + " -----------------------");

                string sqlAudit = "INSERT INTO ibas_loginlogoutaudits ("
                    + "logindatetime, sessionid, user_id, ip_address)"
                    + "VALUES ('" + time + "', '" + SessionValue.ToString() + "', " + Convert.ToInt32(Id) + ", '" + IpAddress + "')";

                string respAudit = dbModel.GetUpdateCount(cs, sqlAudit);

                Session["LoginFlag"] = "0";
                Session["userlogin"] = true;//anandi
            }
            catch (Exception e)
            {
                string msg = e.Message;
            }
        }


        // user02
        public string GetIP()
        {
            try
            {
                return Request.UserHostAddress;
            }
            catch (Exception e)
            {
                string message = "";
                string innerExcp = "";
                if (e.Message != null)
                    message = e.Message.ToString();
                if (e.InnerException != null)
                    innerExcp = e.InnerException.Message;

                return ("Error");
            }

        }


        // user02
        public static IPAddress GetDesktopIPAddress()
        {
            try
            {
                // Get all network interfaces on the system
                NetworkInterface[] networkInterfaces = NetworkInterface.GetAllNetworkInterfaces();

                foreach (NetworkInterface networkInterface in networkInterfaces)
                {
                    // Only consider active network interfaces that are not loopback or tunnel types
                    if (networkInterface.OperationalStatus == OperationalStatus.Up &&
                        networkInterface.NetworkInterfaceType != NetworkInterfaceType.Loopback &&
                        networkInterface.NetworkInterfaceType != NetworkInterfaceType.Tunnel)
                    {
                        // Get all IP addresses assigned to the network interface
                        IPInterfaceProperties properties = networkInterface.GetIPProperties();
                        foreach (UnicastIPAddressInformation unicastAddress in properties.UnicastAddresses)
                        {
                            // Check for IPv4 addresses (change to InterNetworkV6 for IPv6)
                            if (unicastAddress.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                            {
                                return unicastAddress.Address;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur while fetching the IP address
                Console.WriteLine("Error getting desktop IP address: " + ex.Message);
            }

            // Return null if no IP address is found
            return null;
        }


        // user02
        public static IPAddress GetClientIPAddress()
        {
            try
            {
                // Get the current HTTP request context
                HttpContext context = System.Web.HttpContext.Current;

                if (context?.Request?.UserHostAddress != null)
                {
                    // Attempt to parse the client's IP address
                    if (IPAddress.TryParse(context.Request.UserHostAddress, out IPAddress clientAddress))
                    {
                        return clientAddress;
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that might occur while fetching the IP address
                Console.WriteLine("Error getting client IP address: " + ex.Message);
            }

            // Return null if no IP address is found
            return null;
        }


        [HttpPost]
        public bool ValidateSession()
        {
            try
            {
                logerror("ValidateSession", "----- started -----");
                DbModel db = new DbModel();

                string session = "";
                int uid = Convert.ToInt32(Session["uid"]);
                string query = "SELECT sessionid, lastlogin FROM ibas_usermaster WHERE id= " + uid;
                DataSet ds = db.GetDataSet(cs, query);
                
                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    logerror("ValidateSession", "reading ds value");

                    session = Convert.ToString(ds.Tables[0].Rows[0]["sessionid"]);
                    //string InTime = Convert.ToString(ds.Tables[0].Rows[0]["lastlogin"]);
                    //string TimeLimit = Convert.ToString(Session["SessionLimit"]);

                    //bool outdata = db.SessionTime(InTime, TimeLimit);

                    //if (outdata == false)
                    //{
                    //    return false;
                    //}

                    logerror("ValidateSession userid", "uid:" + Convert.ToString(Session["uid"]));


                    if (!DBNull.Value.Equals(Session["uid"]) == false)
                        return false;

                    //int uid = Convert.ToInt32(Session["uid"]);
                    //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                    //using (var con = new NpgsqlConnection(cs))
                    //{
                    //    con.Open();

                    //    //string sql = "SELECT sessionid FROM ibas_webapi_login  where id= '" + uid + "' ";
                    //    string sql = "SELECT sessionid FROM ibas_usermaster WHERE id= " + uid;
                    //    using (var cmd = new NpgsqlCommand(sql, con))
                    //    {
                    //        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                    //        {
                    //            while (rdr.Read())
                    //            {
                    //                session = rdr["sessionid"].ToString();
                    //            }
                    //        }
                    //    }
                    //}

                    logerror("Validate Session Log", "---- result ----");
                    logerror("DB session", "Session ID: " + session.ToString());
                    logerror("Local session", "Session ID: " + Convert.ToString(Session["SessionId"]));

                    if (session != Convert.ToString(Session["SessionId"]))
                    {
                        logerror("Validate Session Log", "---- return false ----");
                        return false;
                    }
                    else
                    {
                        logerror("Validate Session Log", "---- return true ----");
                        return true;
                    }
                }
                else
                {
                    logerror("ValidateSession", "Ds count is 0");
                    return false;
                }
                    
            }
            catch(Exception ex)
            {
                logerror("ValidateSession Exception Caught", "Error Msg: " + ex.Message);
                return false;
            }
            
        }

        public ActionResult iBasLogout()
        {
            try
            {
                logerror("iBasLogout", "Function started");
                DbModel db = new DbModel();

                //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
                DbModel dbModel = new DbModel();

                string sql = "UPDATE ibas_usermaster SET sessionid=null, loginflg=0 "
                        + "WHERE id=" + Convert.ToInt32(Session["uid"]);

                string resp = db.GetUpdateCount(cs, sql);

                string sqlAuditSelect = "select * from ibas_loginlogoutaudits where user_id=" + Convert.ToInt32(Session["uid"]) + " order by logindatetime desc limit 1";

                DataSet ds = dbModel.GetDataSet(cs, sqlAuditSelect);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    int id = Convert.ToInt32(ds.Tables[0].Rows[0]["id"]);
                    string time = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");

                    string sqlAudit = "update ibas_loginlogoutaudits set logoutdatetime='" + time + "' where user_id=" + Convert.ToInt32(Session["uid"]) + " and id=" + id;

                    string respAudit = dbModel.GetUpdateCount(cs, sqlAudit);

                    // Login - Logout Audit
                    string Audit = System.Configuration.ConfigurationManager.AppSettings["LoginLogoutAudit"].ToString();
                    if (Audit != null && Audit != "" && Audit.ToUpper() == "Y")
                    {
                        string msg = "";

                        string loginTime = Convert.ToString(ds.Tables[0].Rows[0]["logindatetime"]);
                        string ip = Convert.ToString(ds.Tables[0].Rows[0]["ip_address"]);

                        string login = "", fname = "", lname = "";

                        string userQuery = "select loginid, firstname, lastname from ibas_usermaster where id=" + Convert.ToInt32(Session["uid"]);
                        DataSet ds1 = dbModel.GetDataSet(cs, userQuery);

                        if (ds1.Tables.Count > 0 && ds1.Tables[0].Rows.Count > 0)
                        {
                            login = Convert.ToString(ds1.Tables[0].Rows[0]["loginid"]);
                            fname = Convert.ToString(ds1.Tables[0].Rows[0]["firstname"]);
                            lname = Convert.ToString(ds1.Tables[0].Rows[0]["lastname"]);
                        }

                        msg = loginTime + ", " + time + ", " + ip + ", " + login + ", " + fname + " " + lname;
                        LoginLogoutAudit(msg);
                    }

                }

                Session.Clear();
                Session.Abandon();
                Session.RemoveAll();
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
                Response.Cache.SetNoStore();
                // FormsAuthentication.SignOut();
                Session.Remove("SessionID");
                Session.RemoveAll();
                Session.Abandon();
                Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));

                return RedirectToAction("LoginiBAS");
            }
            catch (Exception ex)
            {
                logerror("iBasLogout Error", "Exception: " + ex.Message);
                return RedirectToAction("LoginiBAS");
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
            filename = DateTime.Now.ToString("ddMMyyyy") + "Logs.txt";
            fileNameWithPath = ServerPath + filename;
            System.IO.StreamWriter str = new System.IO.StreamWriter(fileNameWithPath, true, System.Text.Encoding.Default);
            //  str.WriteLine("hello");
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": Exception: " + errormsg);
            str.WriteLine(DateTime.Now.ToShortTimeString() + ": StackTrace: " + errordesc);
            str.Close();
        }

        private void LoginLogoutAudit(string msg)
        {
            try
            {
                ErrorDisplay er = new ErrorDisplay();
                string ServerPath = "";
                string filename = "";
                string fileNameWithPath = "";
                //FormsAuthentication.SignOut();

                //-------------------------------- ServerPath = Server.MapPath("~/Logs/");----
                ServerPath = Server.MapPath("~/Logs/");
                if (System.IO.Directory.Exists(ServerPath) == false)
                {
                    System.IO.Directory.CreateDirectory(ServerPath);
                }
                filename = "UserLoginLogs_" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
                fileNameWithPath = ServerPath + filename;
                System.IO.StreamWriter str = new System.IO.StreamWriter(fileNameWithPath, true, System.Text.Encoding.Default);
                str.WriteLine(msg);
                str.Close();
            }
            catch (Exception e)
            {
                logerror("LoginLogoutAudit", "Error: " + e.Message);
            }
        }

        public ActionResult ResetPassword(string val = null)
        {
            try
            {
                if (Session["Login_Page_Id"] == null)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                ViewBag.alertmsg = val;

                //return View();
                return View("ResetPasswordPage");
            }
            catch (Exception ex)
            {
                return View();
            }
        }


        [HttpPost]
        public ActionResult ResetPassword(PasswordModel model)
        {
            try
            {

                string sql = "SELECT * FROM ibas_AppSecPolicy WHERE id=1 AND name='Policy1'";
                int min = 0, max = 0;
                bool alpha = false, special = false;

                //var cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;

                DbModel dbModel = new DbModel();
                DataSet ds = dbModel.GetDataSet(cs, sql);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    min = Convert.ToInt32(ds.Tables[0].Rows[0]["minpwdlength"]);
                    max = Convert.ToInt32(ds.Tables[0].Rows[0]["maxpwdlength"]);
                    alpha = Convert.ToBoolean(ds.Tables[0].Rows[0]["alphanumericmandatory"]);
                    special = Convert.ToBoolean(ds.Tables[0].Rows[0]["specialcharmandatory"]);
                }

                //using (var con = new NpgsqlConnection(cs))
                //{
                //    con.Open();
                //    using (var cmd = new NpgsqlCommand(sql, con))
                //    {
                //        using (NpgsqlDataReader rdr = cmd.ExecuteReader())
                //        {
                //            while (rdr.Read())
                //            {
                //                min = Convert.ToInt32(rdr["minpwdlength"]);
                //                max = Convert.ToInt32(rdr["maxpwdlength"]);
                //                alpha = Convert.ToBoolean(rdr["alphanumericmandatory"]);
                //                special = Convert.ToBoolean(rdr["specialcharmandatory"]);
                //            }
                //        }
                //    }
                //    con.Close();
                //}

                if (model.NewPassword1.Length < min || model.NewPassword1.Length > max)
                {
                    return RedirectToAction("ResetPassword", new { val = "Oops! Your minimum password length should be " + min.ToString() + " and maximum password length should be " + max.ToString() + "!" });
                }

                bool result = false;
                bool isDigit = false;
                bool isLetter = false;
                bool isLowerChar = false;
                bool isUpperChar = false;
                bool isNonAlpha = false;

                

                foreach (char c in model.NewPassword1)
                {
                    if (char.IsDigit(c))
                        isDigit = true;
                    if (char.IsLetter(c))
                    {
                        isLetter = true;
                        if (char.IsLower(c))
                            isLowerChar = true;
                        if (char.IsUpper(c))
                            isUpperChar = true;
                    }
                    Match m = Regex.Match(c.ToString(), @"\W|_");
                    if (m.Success)
                        isNonAlpha = true;
                }

                if (alpha == false)
                {
                    isLowerChar = true;
                    isUpperChar = true;
                }

                if (special == false)
                    isNonAlpha = true;


                if (isDigit && isLetter && isLowerChar && isUpperChar && isNonAlpha)
                    result = true;

                
                if (result == false)
                {
                    //ModelState.AddModelError("", "Oops! Password should contain alphanumeric and one special charater and one capital letter!");
                    return RedirectToAction("ResetPassword", new { val = "Oops! Password should contain alphanumeric and one special charater and one capital letter!" });
                }

                int id = Convert.ToInt32(Session["uid"]);

                string updateSql = "UPDATE ibas_usermaster SET password = pgp_sym_encrypt('" + model.NewPassword1.ToString() + "', 'ibas123'), firstlogin=0 "
                    + "WHERE id=" + id;

                string respUpdateUserMaster = dbModel.GetUpdateCount(cs, updateSql);


                //using (var con = new NpgsqlConnection(cs))
                //{
                //    con.Open();
                //    using (NpgsqlCommand cmd = new NpgsqlCommand())
                //    {
                //        cmd.CommandType = CommandType.Text;
                //        cmd.CommandText = updateSql;
                //        cmd.Connection = con;
                //        int reccount = cmd.ExecuteNonQuery();
                //    }
                //}


                return RedirectToAction("LoginiBAS", new { cond = 3 });
            }
            catch (Exception ex)
            {
                return RedirectToAction("ResetPassword", new { val = "Exception caught! " + ex.Message });
            }
        }


        //[HttpPost]
        //[Route("GetXMLFile")]
        //public IHttpActionResult GetXMLFile()
        //{
        //    WriteErrorLog("In GetXMLFile", "Downloading XML in CaptureRawData table start.");
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(databaseConnection))
        //        {
        //            SqlCommand com = new SqlCommand("DownloadXMLDataFromCaptureRawData", con);
        //            com.CommandType = CommandType.StoredProcedure;

        //            DataSet ds = new DataSet();
        //            SqlDataAdapter dadapter = new SqlDataAdapter(com);
        //            dadapter.Fill(ds);

        //            XmlDocument outputDocument = new XmlDocument();
        //            XmlNode docNode = outputDocument.CreateXmlDeclaration("1.0", "UTF-8", null);
        //            outputDocument.AppendChild(docNode);

        //            if (ds.Tables[0].Rows.Count > 0)
        //            {
        //                XmlElement root = outputDocument.CreateElement("Items");
        //                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        //                {
        //                    Int16 customerId = Convert.ToInt16(ds.Tables[0].Rows[i]["CustomerId"]);
        //                    string downloadSettingValue = ds.Tables[0].Rows[i]["DownloadSettingValue"].ToString();

        //                    string ChqFrontImagedataTIFF = ImageToBase64CompressTiff(ds.Tables[0].Rows[i]["ChqFrontImagedataTIFF"].ToString(), customerId, downloadSettingValue);
        //                    string ChqRearImagedataTIFF = ImageToBase64CompressTiff(ds.Tables[0].Rows[i]["ChqRearImagedataTIFF"].ToString(), customerId, downloadSettingValue);
        //                    string ChqFrontImagedataJPG = ImageToBase64CompressJpg(ds.Tables[0].Rows[i]["ChqFrontImagedataJPG"].ToString(), customerId, downloadSettingValue); //GetBase64String(ds.Tables[0].Rows[i]["ChqFrontImagedataJPG"].ToString(), customerId, downloadSettingValue);
        //                    //string ChqUVJpeg = GetBase64String(ds.Tables[0].Rows[i]["ChqUVJpeg"].ToString(), customerId, downloadSettingValue);
        //                    string ChqUVJpeg = "";

        //                    XmlElement rootElement = outputDocument.CreateElement("Item");
        //                    XmlElement rootElement1 = outputDocument.CreateElement("Document");
        //                    rootElement1.SetAttribute("xmlns", "urn:iso:std:iso:20022:tech:xsd:pain.012.001.01");
        //                    rootElement.AppendChild(rootElement1);

        //                    XmlElement rootElement2 = outputDocument.CreateElement("CustAccountNo");
        //                    //rootElement2.SetAttribute("CustAccountNo", ds.Tables[0].Rows[i]["CustAccountNo"].ToString());
        //                    rootElement2.InnerText = ds.Tables[0].Rows[i]["CustAccountNo"].ToString();
        //                    rootElement.AppendChild(rootElement2);

        //                    XmlElement rootElement3 = outputDocument.CreateElement("CustName");
        //                    rootElement3.InnerText = ds.Tables[0].Rows[i]["CustName"].ToString();
        //                    rootElement.AppendChild(rootElement3);

        //                    XmlElement rootElement4 = outputDocument.CreateElement("ChqNo");
        //                    rootElement4.InnerText = ds.Tables[0].Rows[i]["ChqNo"].ToString();
        //                    rootElement.AppendChild(rootElement4);

        //                    XmlElement rootElement5 = outputDocument.CreateElement("MICRAccountNo");
        //                    rootElement5.InnerText = ds.Tables[0].Rows[i]["MICRAccountNo"].ToString();
        //                    rootElement.AppendChild(rootElement5);

        //                    XmlElement rootElement6 = outputDocument.CreateElement("DrawerName");
        //                    rootElement6.InnerText = ds.Tables[0].Rows[i]["DrawerName"].ToString();
        //                    rootElement.AppendChild(rootElement6);

        //                    XmlElement rootElement7 = outputDocument.CreateElement("SortCode");
        //                    rootElement7.InnerText = ds.Tables[0].Rows[i]["SortCode"].ToString();
        //                    rootElement.AppendChild(rootElement7);

        //                    XmlElement rootElement8 = outputDocument.CreateElement("ChqAmount");
        //                    rootElement8.InnerText = ds.Tables[0].Rows[i]["ChqAmount"].ToString();
        //                    rootElement.AppendChild(rootElement8);

        //                    XmlElement rootElement9 = outputDocument.CreateElement("ChqDate");
        //                    rootElement9.InnerText = ds.Tables[0].Rows[i]["ChqDate"].ToString();
        //                    rootElement.AppendChild(rootElement9);

        //                    XmlElement rootElement10 = outputDocument.CreateElement("TranCode");
        //                    rootElement10.InnerText = ds.Tables[0].Rows[i]["TranCode"].ToString();
        //                    rootElement.AppendChild(rootElement10);

        //                    XmlElement rootElement11 = outputDocument.CreateElement("BranchCode");
        //                    rootElement11.InnerText = ds.Tables[0].Rows[i]["BranchCode"].ToString();
        //                    rootElement.AppendChild(rootElement11);

        //                    XmlElement rootElement12 = outputDocument.CreateElement("MICRData");
        //                    rootElement12.InnerText = ds.Tables[0].Rows[i]["MICRData"].ToString();
        //                    rootElement.AppendChild(rootElement12);

        //                    XmlElement rootElement13 = outputDocument.CreateElement("ChqDepositDate");
        //                    rootElement13.InnerText = ds.Tables[0].Rows[i]["ChqDepositDate"].ToString();
        //                    rootElement.AppendChild(rootElement13);

        //                    XmlElement rootElement14 = outputDocument.CreateElement("TerminalID");
        //                    rootElement14.InnerText = ds.Tables[0].Rows[i]["TerminalID"].ToString();
        //                    rootElement.AppendChild(rootElement14);

        //                    XmlElement rootElement15 = outputDocument.CreateElement("ChqFrontImagedataTIFF");
        //                    rootElement15.InnerText = ChqFrontImagedataTIFF;
        //                    rootElement.AppendChild(rootElement15);

        //                    XmlElement rootElement16 = outputDocument.CreateElement("ChqRearImagedataTIFF");
        //                    rootElement16.InnerText = ChqRearImagedataTIFF;
        //                    rootElement.AppendChild(rootElement16);

        //                    XmlElement rootElement17 = outputDocument.CreateElement("ChqFrontImagedataJPG");
        //                    rootElement17.InnerText = ChqFrontImagedataJPG;
        //                    rootElement.AppendChild(rootElement17);

        //                    XmlElement rootElement18 = outputDocument.CreateElement("ChqUVJpeg");
        //                    rootElement18.InnerText = ChqUVJpeg;
        //                    rootElement.AppendChild(rootElement18);



        //                    //rootElement.SetAttributeNode("Document", "xmlns = 'urn:iso:std:iso:20022:tech:xsd:pain.012.001.01'");
        //                    //rootElement.SetAttributeNode("CustAccountNo", ds.Tables[0].Rows[i]["CustAccountNo"].ToString());
        //                    //rootElement.SetAttributeNode("CustName", ds.Tables[0].Rows[i]["CustName"].ToString());
        //                    //rootElement.SetAttributeNode("ChqNo", ds.Tables[0].Rows[i]["ChqNo"].ToString());
        //                    //rootElement.SetAttributeNode("MICRAccountNo", ds.Tables[0].Rows[i]["MICRAccountNo"].ToString());
        //                    //rootElement.SetAttributeNode("DrawerName", ds.Tables[0].Rows[i]["DrawerName"].ToString());
        //                    //rootElement.SetAttributeNode("SortCode", ds.Tables[0].Rows[i]["SortCode"].ToString());
        //                    //rootElement.SetAttributeNode("ChqAmount", ds.Tables[0].Rows[i]["ChqAmount"].ToString());
        //                    //rootElement.SetAttributeNode("ChqDate", ds.Tables[0].Rows[i]["ChqDate"].ToString());
        //                    //rootElement.SetAttributeNode("TranCode", ds.Tables[0].Rows[i]["TranCode"].ToString());
        //                    //rootElement.SetAttributeNode("BranchCode", ds.Tables[0].Rows[i]["BranchCode"].ToString());
        //                    //rootElement.SetAttributeNode("MICRData", ds.Tables[0].Rows[i]["MICRData"].ToString());
        //                    //rootElement.SetAttributeNode("ChqDepositDate", ds.Tables[0].Rows[i]["ChqDepositDate"].ToString());
        //                    //rootElement.SetAttributeNode("TerminalID", ds.Tables[0].Rows[i]["TerminalID"].ToString());
        //                    //rootElement.SetAttributeNode("ChqFrontImagedataTIFF", ChqFrontImagedataTIFF);
        //                    //rootElement.SetAttributeNode("ChqRearImagedataTIFF", ChqRearImagedataTIFF);
        //                    //rootElement.SetAttributeNode("ChqFrontImagedataJPG", ChqFrontImagedataJPG);
        //                    //rootElement.SetAttributeNode("ChqUVJpeg", ChqUVJpeg);

        //                    //outputDocument.AppendChild(rootElement);
        //                    root.AppendChild(rootElement);
        //                }
        //                outputDocument.AppendChild(root);

        //            }
        //            return Json(outputDocument.OuterXml);

        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        //WriteErrorLog("*********************** In GetXMLFile catch ***************************************");
        //        return Json(e.ToString());
        //        //return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
        //    }
        //}


        public Boolean InvalidPassword(int invalidPassCount, string loginId, string conncetionString)
        {
            try
            {
                string sqlWrongPassword = null;

                if (invalidPassCount > 3)
                {
                    TempData["ErrorMessage"] = "Too many invalid attempts! Username disabled!";
                    sqlWrongPassword = "UPDATE ibas_usermaster SET invalidpasswordattempts=" + invalidPassCount + ", active=0 WHERE id=" + Convert.ToInt32(loginId);
                }
                else
                {
                    TempData["ErrorMessage"] = "Invalid Username or Password!";
                    sqlWrongPassword = "UPDATE ibas_usermaster SET invalidpasswordattempts=" + invalidPassCount + " WHERE id=" + Convert.ToInt32(loginId);
                }

                DbModel dbModel = new DbModel();
                string respInvalidPassword = dbModel.GetUpdateCount(conncetionString, sqlWrongPassword);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            
        }


        //User04 --starts
        public static byte[] Encrypt(string plainText, byte[] key, byte[] iv)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = key;
                aesAlg.IV = iv;

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }
                        return msEncrypt.ToArray();
                    }
                }
            }
        }
        //User04 --starts
        public static string Decrypt(byte[] cipherText, byte[] key, byte[] iv)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = key;
                aesAlg.IV = iv;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
        }

        //User04 --ends


        //User04 --starts
        public async Task<k_bop_api> get_k_bop_api_details(k_bop_api model)
        {
            //k_bop_api model = new k_bop_api();
            k_bop_api outData = new k_bop_api();
            try
            {
                DbModel db = new DbModel();

                string sql = "SELECT * FROM ibas_apisettings WHERE bankcode = 'k_bop'";
                DataSet ds = db.GetDataSet(cs, sql);
                string k_bop_url = "";
                byte[] key = Convert.FromBase64String("Vjg2gEaSElLqTfO7HxYF7w==");
                byte[] iv = Convert.FromBase64String("6IyZfDZo9+2owB9kfQaGqg==");


                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        string apiname = Convert.ToString(ds.Tables[0].Rows[i]["apiname"]);

                        if (apiname == "k_bop_token_user_name")
                        {
                            byte[] ciphertext = Encrypt(Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]), key, iv);
                            string encodedCiphertext = Convert.ToBase64String(ciphertext);

                            byte[] decodedCiphertext = Convert.FromBase64String(encodedCiphertext);
                            string decryptedText = Decrypt(decodedCiphertext, key, iv);

                            model.username = "k_bop" + encodedCiphertext;
                        }
                        else if (apiname == "k_bop_token_password")
                        {
                            byte[] ciphertext = Encrypt(Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]), key, iv);
                            string encodedCiphertext = Convert.ToBase64String(ciphertext);

                            byte[] decodedCiphertext = Convert.FromBase64String(encodedCiphertext);
                            string decryptedText = Decrypt(decodedCiphertext, key, iv);


                            model.password = "k_bop" + encodedCiphertext;
                        }
                        else if (apiname == "k_bop_token_url")
                        {
                            string ApiUrlCallFromDb = System.Configuration.ConfigurationManager.AppSettings["ApiUrlCallFromDb"].ToString();

                            if (ApiUrlCallFromDb.ToUpper() == "N")
                                k_bop_url = "http://localhost:8198/api/Scanner/";
                            else 
                                k_bop_url = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                            
                            //k_bop_url = "http://localhost:8198/api/Scanner/";
                            //k_bop_url = "http://103.231.78.237/k_bop_webapi/api/Scanner/";
                            //k_bop_url = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);

                        }
                        else if (apiname == "k_bop_token_grant_type")
                            model.grant_type = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                        else if (apiname == "k_bop_Kval")
                            model.Encryption_Key = Convert.ToString(ds.Tables[0].Rows[i]["apivalue"]);
                    }
                }
                else
                {
                    //WriteErrorLog("No Data found", "API - get_IzDox_val");
                    //model.ErrorMsg = "No data Found";
                }

                //       string resp =await GetAccessToken(model);

                using (var client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    k_bop_url += "token";
                    var formContent = new FormUrlEncodedContent(new[]
                    {
                      new KeyValuePair<string, string>("grant_type", model.grant_type),
                      new KeyValuePair<string, string>("username", model.username),
                      new KeyValuePair<string, string>("password", model.password)
                     
                      //new KeyValuePair<string, string>("password", "k_bop")
                      // Additional parameters as needed
                    });

                    var tokenResponse = await client.PostAsync(k_bop_url, formContent);
                    var tokenJson = await tokenResponse.Content.ReadAsStringAsync();

                    // Handle the token response and return the result
                    
                    if (tokenResponse.IsSuccessStatusCode)
                    {
                        // Token generation successful
                        outData.access_token = JObject.Parse(tokenJson)["access_token"].ToString();
                        outData.token_type = JObject.Parse(tokenJson)["token_type"].ToString();
                        outData.expires_in = JObject.Parse(tokenJson)["expires_in"].ToString();
                        outData.Encryption_Key = model.Encryption_Key;

                        return outData;
                    }
                    else
                    {
                        // Token generation failed
                        outData.errorMsg = JObject.Parse(tokenJson)["error"].ToString();
                        return outData;
                    }
                }

                //return "";
            }
            catch (Exception ex)
            {
                // WriteErrorLog("Error: " + ex.Message, "API - get_IzDox_val");
                // model.ErrorMsg = ex.Message;

                outData.errorMsg = ex.Message;

                return outData;
            }

        }


        //User04 --starts 2023/06/23
        //[Route("AD_Authentication")]
        public bool AD_Authentication(AD_Authentication input)
        {
            try
            {
                logerror("AD Login", "--------------------- AD Authentication function Start ---------------------");

                //User04 --starts   2023/06/23
                string jsonObject1 = JsonConvert.SerializeObject(input);
                string quer = "null,'" + jsonObject1 + "', null, '" + input.Ad_url + "'";
                //bool functcall = insertapilog(quer);
                //User04 --ends

                string secretkey = "APuZKpRBPv8aEenc";

                //logerror("AD Authentication", "Secret Key: " + secretkey);
                //logerror("AD Authentication", "url : " + input.Ad_url);
                //logerror("AD Authentication", "Channel : " + input.Channel);
                //logerror("AD Authentication", "UserID : " + input.UserID);
                //logerror("AD Authentication", "Password : " + input.Password);

                AD_Authentication ADObject = new AD_Authentication();
                ADObject.UserID = input.UserID;
                // ADObject.Password = input.Password;
                ADObject.Channel = input.Channel;
                // //WriteErrorLog("Received request from machineserialno : " + objScanningNode.SerailNoID, "AD_Authentication");

                AD_Encrypt.EncryptDecryptString AU_obj = new AD_Encrypt.EncryptDecryptString();
                ADObject.Password = AU_obj.Encrypt(input.Password, secretkey);

                //logerror("AD Authentication", "encrypted Password : " + ADObject.Password);

                string responseString = "";

                using (var client = new HttpClient())
                {
                    //logerror("AD Authentication", " JSON serialization start");

                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    //var jsonSerialNo = JsonConvert.SerializeObject(ADObject);

                    //logerror("AD Authentication", " JSON serialization end");

                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //var content = new StringContent(jsonSerialNo, Encoding.UTF8, "application/json");
                    //var response = client.PostAsJsonAsync("http://103.231.78.237/ScanningWebAPI/api/Scanner/insertScanData", content).Result;
                    //var response = client.PostAsJsonAsync("http://103.231.78.237/api/Scanner/insertScanData", objCommonClass).Result;

                    //logerror("AD Authentication", "url call start");

                    string url = input.Ad_url + "?UserID=" + ADObject.UserID + "&Password=" + ADObject.Password + "&Channel=" + ADObject.Channel;
                    //logerror("AD Authentication", "GET URL: " + url);

                    //var response = client.PostAsync(input.Ad_url, content).Result;
                    var response = client.GetAsync(url).Result;

                    //logerror("AD Authentication", "url call end");

                    //WriteErrorLog("AD Response" + response.ToString(), "AD_Authentication");
                    bool resp = false;

                    logerror("AD Authentication", "response received");

                    if (response.IsSuccessStatusCode)
                    {
                        //logerror("AD Authentication", "Within response");

                        responseString = response.Content.ReadAsStringAsync().Result;

                        if ((string.IsNullOrEmpty((string)responseString)) || (string)responseString == "{}")
                        {
                            logerror("AD Authentication", "Response is EMPTY");

                            //WriteErrorLog("AD Response" + responseString.ToString(), "AD_Authentication");
                            resp = false;
                        }
                        else
                        {
                            //logerror("AD Authentication", "Response is present");
                            StreamReader sReader = new StreamReader(new MemoryStream(Encoding.ASCII.GetBytes(responseString)));

                            //logerror("AD Authentication", "stream reader over");

                            var json = sReader.ReadToEnd();

                            //logerror("AD Authentication", "json save");
                            //logerror("AD Authentication", "json: " + json);

                            var jOutVal = Newtonsoft.Json.Linq.JObject.Parse(json);

                            //logerror("AD Authentication", "json 1: " + jOutVal);

                            string Response = Convert.ToString(jOutVal["return"]);

                            //logerror("AD Authentication", "json 2: " + Response);

                            if (Response != null && Response != "" && Response.ToUpper() == "FALSE")
                                resp = false;
                            else
                                resp = true;

                            //dynamic jsonObject = JsonConvert.DeserializeObject(json);

                            //logerror("AD Authentication", "json obj created");
                            //logerror("AD Authentication", "json obj: " + jsonObject);

                            //resp = true;
                        }
                    }
                    else
                    {
                        logerror("AD Authentication", "Failed Response");
                        logerror("AD Authentication", "Response: " + Convert.ToString(response));
                    }

                    //logerror("AD Authentication", "End of response");

                    return resp;

                }
                //WriteErrorLog("AD_Authentication block ended ", "AD_Authentication");
                //WriteErrorLog("************************************************AD_Authentication API call end   ********************************************", "");

                logerror("AD Authentication", "------------- AD Authentication function end ------------");
            }
            catch (Exception e)
            {
                string sInnerException = "";

                logerror("AD Authentication", "Exception Caught: " + e.Message);

                if (e.InnerException != null)
                    sInnerException = e.InnerException.Message.ToString();

                //WriteErrorLog("AD_Authentication " + e.Message, sInnerException);

                return false;

            }
        }



        //User04 --starts 2023/06/23


        //User04 --ends

    }
}

