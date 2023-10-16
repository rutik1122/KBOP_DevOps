using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class BranchSodController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        public ActionResult CashData(string Name = null)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                if (Name == "SOD")
                {
                    if (Convert.ToBoolean(Session["sod"]) == false)
                        return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });
                    
                    ViewBag.PT = "SOD";
                    ViewBag.TitleName = "SOD";
                    ViewBag.SubName = "Start Of Day";
                }
                else if (Name == "EOD")
                {
                    if (Convert.ToBoolean(Session["eod"]) == false)
                        return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                    ViewBag.PT = "EOD";
                    ViewBag.TitleName = "Currency Chest";
                    ViewBag.SubName = "CC";
                }
                else if (Name == "CASHEX")
                {
                    ViewBag.PT = "CASHEX";
                    ViewBag.TitleName = "Currency Exchange";
                    ViewBag.SubName = "Cash Exchange";

                }

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
    }
}