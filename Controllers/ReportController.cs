using iBAS.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;

namespace iBAS.Controllers
{
    public class ReportController : Controller
    {

        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: Report

        //[HttpGet]
        public ActionResult ReportPage()
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
        public async Task<ActionResult> ReportPage(string fromdate = null, string todate = null)
        {
            try
            {
                logerror("Report Page Details", "------------- Function Start -------------");
                // string fromdate = Request.Form["yes1"];
                // string todate = Request.Form["yes2"];

                string fdate = Request.Form["from_date"];

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    logerror("Report Page Details", "client request");

                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    // urlString = urlString.Replace("Scanner", "Master");

                    ViewBag.TitleName = "Reports";

                    var tellerid = Convert.ToString(Session["Login_Page_Id"]);
                    ViewBag.URL = urlString;
                    ViewBag.WebImageURL = WebImageURL;
                    ViewBag.PhysicalImageURL = PhysicalImageURL;

                    logerror("Report Page Details", "pass parameter");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("from_date",Convert.ToString(fromdate)),
                        new KeyValuePair<string,string>("to_date",Convert.ToString(todate)),
                        new KeyValuePair<string,string>("tellerid",Convert.ToString(tellerid)),

                    });

                    logerror("Report Page Details", "parameter set");

                    // content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "getCTSwisePresentationReport", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        logerror("Report Page Details", "success response");
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        logerror("Report Page Details", "success response2");
                        List<Transaction_CTSwise_Presentation> report = JsonConvert.DeserializeObject<List<Transaction_CTSwise_Presentation>>(jsonResponse);
                        logerror("Report Page Details", "success response3");
                        TempData["reportlist"] = report;
                        logerror("Report Page Details", "success response4");
                        //return View("_ReportPartial", TempData["reportlist"]);
                        return Json(report);
                    }
                    return View();
                }

                logerror("Report Page Details", "------------- Function End -------------");

            }
            catch (Exception ex)
            {
                logerror("Report Page Details Error", "Exception error: " + ex.Message);
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