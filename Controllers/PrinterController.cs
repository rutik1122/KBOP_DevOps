using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class PrinterController : Controller
    {
        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: Printer
        public ActionResult Home()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }

        public ActionResult Index()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }

        public ActionResult AddMapping()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }


        public ActionResult PrinterMapping()
        {
            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }
    }
}