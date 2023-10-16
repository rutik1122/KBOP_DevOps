using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class DemandDraftController : Controller
    {

        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: DemandDraft
        public ActionResult DemandDraftSelection()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }


        [HttpPost]
        public ActionResult DemandDraftSelection(string DD_Type = null)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            ViewBag.DD_Type = DD_Type;

            if (DD_Type == "01")
                ViewBag.TitleName = "Demand Draft with Cash";
            else if (DD_Type == "02")
                ViewBag.TitleName = "Demand Draft with Cheque";
            else if (DD_Type == "03")
                ViewBag.TitleName = "Demand Draft with Withdrawal Slip";
            else if (DD_Type == "04")
                ViewBag.TitleName = "Demand Draft with Debit Intimation";

            return View("MakerDemandDraft");
        }


    }
}