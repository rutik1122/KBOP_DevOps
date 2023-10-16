﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class DashboardController : Controller
    {

        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        
        public ActionResult Index()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });


                if (Convert.ToBoolean(Session["dashboard"]) == false)
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


        public ActionResult DetailedDashboard()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });


                if (Convert.ToBoolean(Session["dashboard"]) == false)
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

        public ActionResult DetailedDashboardNew()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });


                if (Convert.ToBoolean(Session["dashboard"]) == false)
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


    }
}