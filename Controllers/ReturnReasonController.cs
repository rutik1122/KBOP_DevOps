using iBAS.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class ReturnReasonController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: ReturnReason
        public async Task<ActionResult> List()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    var content = new StringContent(string.Empty);

                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "ReasonList", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        List<ReasonMaster> reasons = JsonConvert.DeserializeObject<List<ReasonMaster>>(jsonResponse);
                        return View(reasons);
                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public ActionResult Create()
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(ReasonMaster model)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("reasoncode",model.ReasonCode),
                        new KeyValuePair<string,string>("description",model.Description),
                    });

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = await client.PostAsync(urlString + "SaveReasonData", content);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            TempData["success"] = "Reason Added";
                            //return RedirectToAction("CreateBranch", new { id = 1 });
                            return View();
                        }

                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public async Task<ActionResult> Edit(string reasoncode, ReasonMaster model)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.oldCode = reasoncode;
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("oldcode",model.oldCode)
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetReasonData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        ReasonMaster reason = JsonConvert.DeserializeObject<ReasonMaster>(jsonResponse);

                        return View(reason);
                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Edit(ReasonMaster model)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.oldCode = model.ReasonCode;
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("oldcode",model.oldCode),
                        new KeyValuePair<string,string>("reasoncode",model.ReasonCode),
                        new KeyValuePair<string,string>("description",model.Description),
                    });

                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateReasonData", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            TempData["success"] = "Reason Updated";
                            return View();
                            //return RedirectToAction("List");
                        }
                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public async Task<ActionResult> Delete(string reasoncode, ReasonMaster model)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.oldCode = reasoncode;
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("oldcode",model.oldCode)
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetReasonData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        ReasonMaster reason = JsonConvert.DeserializeObject<ReasonMaster>(jsonResponse);

                        return View(reason);
                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }
        [HttpPost]
        public async Task<ActionResult> Delete(ReasonMaster model)
        {

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.oldCode = model.ReasonCode;
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("oldcode",model.oldCode),
                        new KeyValuePair<string,string>("reasoncode",model.ReasonCode),
                        new KeyValuePair<string,string>("description",model.Description),
                    });

                    HttpResponseMessage response = await client.PostAsync(urlString + "DeleteReason", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            TempData["success"] = "Reason Deleted";
                            return View();
                            //return RedirectToAction("List");
                        }
                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        public async Task<ActionResult> Details(ReasonMaster model)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //model.oldCode = reasoncode;
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("oldcode",model.oldCode)
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetReasonData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        ReasonMaster reason = JsonConvert.DeserializeObject<ReasonMaster>(jsonResponse);

                        return View(reason);
                    }
                    return View();
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }
    }
}