using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class CI_DI_FormController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        [HttpGet]
        public ActionResult CISelectionPage()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            //if (Convert.ToBoolean(Session["cimaker"]) == false)
            //    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            return View();
        }

        [HttpPost]
        public ActionResult CISelectionPage(string Scanning_Type)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transfermaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.TitleName = "Transfer Cheque";
            ViewBag.ScanningType = Scanning_Type;

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            //if (Scanning_Type == "1")
            //    ViewBag.SubTitleName = "Retail with Slip";
            //if (Scanning_Type == "2")
            //    ViewBag.SubTitleName = "Retail without Slip";
            if (Scanning_Type == "1")
            {
                return View("CI01_L1");
            }
            else if (Scanning_Type == "2" || Scanning_Type == "3" || Scanning_Type == "4")
            {
                return View("CI_L1");
            }


            return View();

        }

        [HttpGet]
        public ActionResult DISelectionPage()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            //if (Convert.ToBoolean(Session["cimaker"]) == false)
            //    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            return View();
        }

        [HttpPost]
        public ActionResult DISelectionPage(string Scanning_Type)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transfermaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.TitleName = "Debit Intimation";
            ViewBag.ScanningType = Scanning_Type;

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            if (Scanning_Type == "1")
                ViewBag.SubTitleName = "DI with Cash";
            else if (Scanning_Type == "2")
                ViewBag.SubTitleName = "DI with Slip";
            else if (Scanning_Type == "3")
                ViewBag.SubTitleName = "DI with CI";

            if (Scanning_Type == "1")
                return View("DI01_L1");
            return View("DI_L1");
        }

        public ActionResult GetCash(string id, string refno, string transaction_type)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;
                ViewBag.Count_id = id;
                ViewBag.RefNo = refno;

                if (transaction_type == "DI01")
                {
                    ViewBag.PageType = "DI01";
                    return View("GetCashDI");
                }
                else if (transaction_type == "CI01")
                {
                    ViewBag.PageType = "CI01";
                    return View("GetCashCI");
                }

                return View();
            }
            catch(Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public ActionResult DIRollbackForm(string id, string refno, string transType)
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

                if (transType == "DI01")
                {
                    return View("DI01RollBack");
                }

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public ActionResult CIRollbackForm(string id, string refno, string transType)
        {
            try
            {
                ViewBag.URL = urlString;
                ViewBag.WebImageURL = WebImageURL;
                ViewBag.PhysicalImageURL = PhysicalImageURL;


                ViewBag.RefNo = refno;
                ViewBag.Count_id = id;
                ViewBag.transType = transType;
                if (transType == "CI01")
                {
                    return View("CIRollbackFormCash");
                }
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

    }
}