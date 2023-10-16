using iBAS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebGrease.Activities;

namespace iBAS.Controllers
{
    public class DepositWithdrawController : Controller
    {

        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: Main
        public ActionResult Deposit(string Name = null)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    logerror("Deposit Page", "Session Check");
                    logerror("Deposit Page", "Session Login ID: " + Convert.ToString(Session["Login_Page_Id"]));

                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Convert.ToBoolean(Session["cashdepositmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                string bcode = Session["BankCode"].ToString();

                if (Session["BankCode"].ToString() == "240")
                    return View("Deposit_240");
                else
                    return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        [HttpGet]
        public ActionResult WithdrawSelectionPage()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["cashwithdrawalmaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            return View();
        }


        [HttpPost]
        public ActionResult WithdrawSelectionPage(string Scanning_Type = null)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["cashwithdrawalmaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.TitleName = "Cash Withdraw";
            ViewBag.ScanningType = Scanning_Type;

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            string bcode = Session["BankCode"].ToString();

            //ViewBag.DocumentType = "CHQ";

            if (bcode == "240")
            {
                return View("Withdraw_240");
            }
            else
            {
                return View("Withdraw");
            }

            return View();
        }


        public ActionResult Withdraw(string Name = null)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    logerror("Withdrawal Page", "Session Check");
                    logerror("Withdrawal Page", "Session Login ID: " + Convert.ToString(Session["Login_Page_Id"]));

                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Convert.ToBoolean(Session["cashwithdrawalmaker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                ViewBag.ScanningType = "0";

                ViewBag.DocumentType = "CHQ";

                //return View("Withdraw_original");
                if (Session["BankCode"].ToString() == "240")
                    return View("Withdraw_240");
                else
                    return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        public ActionResult CheckerWithdrawList()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Session["CheckerModule"].ToString() != "Y")
                    return RedirectToAction("Index", "Home");

                if (Convert.ToBoolean(Session["cashwithdrawalchecker"]) == false && Convert.ToBoolean(Session["cashwithdrawalmaker"]) == false)
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


        public ActionResult CheckerDepositList()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Session["CheckerModule"].ToString() != "Y")
                    return RedirectToAction("Index", "Home");

                if (Convert.ToBoolean(Session["cashdepositchecker"]) == false && Convert.ToBoolean(Session["cashdepositchecker"]) == false)
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


        public ActionResult CheckerWithdraw(string id, string refno, string datatype = null, string verf = null, string type = null)
        {
            try
            {
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;

                ViewBag.Count_id = id;
                ViewBag.RefNo = refno;
                

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Convert.ToBoolean(Session["cashwithdrawalmaker"]) == false && datatype.ToUpper() == "CASH")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                if (Convert.ToBoolean(Session["cashwithdrawalchecker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                if (datatype.ToUpper() == "CASH")
                {
                    if (type == "WithDraw")
                    {
                        ViewBag.headerVal = "Withdrawal Cash Entry";
                        ViewBag.PageType = "WithDraw";
                    }
                    else
                    {
                        ViewBag.headerVal = "Deposit Cash Entry";
                        ViewBag.PageType = "Deposit";
                    }
                    
                    return View("GetCash");
                    //return View("WithdrawalCash");
                }

                if (verf == "L2")
                    ViewBag.Verf = verf;
                else if (verf == "L3")
                    ViewBag.Verf = verf;

                if (type == "CASHDEP")
                {
                    ViewBag.headerVal = "Cash Deposit Checker";
                    ViewBag.tranType = "CASHDEP";
                }
                else
                {
                    ViewBag.headerVal = "Cash Withdrawal Checker";
                    ViewBag.tranType = "CASHWDL";
                }
                    

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        public ActionResult CheckerDeposit(string id, string refno, string datatype = null, string verf = null)
        {
            try
            {
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;


                ViewBag.RefNo = refno;
                ViewBag.Count_id = id;

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if (Convert.ToBoolean(Session["cashdepositmaker"]) == false && datatype.ToUpper() == "CASH")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                if (Convert.ToBoolean(Session["cashdepositchecker"]) == false)
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                //if (datatype.ToUpper() == "CASH")
                //{
                //    ViewBag.PageType = "WithDraw";
                //    return View("WithdrawalCash");
                //}

                if (verf == "L2")
                    ViewBag.Verf = verf;
                else if (verf == "L3")
                    ViewBag.Verf = verf;

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        public ActionResult RollbackForm(string id, string refno, string transType)
        {
            try
            {
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;


                ViewBag.RefNo = refno;
                ViewBag.Count_id = id;
                ViewBag.transType = transType;

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                return View();
            }
            catch(Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
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


    }
}