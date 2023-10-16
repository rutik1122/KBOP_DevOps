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
using iBAS.Models;

namespace iBAS.Controllers
{
    public class ModeofOperationController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // OperationList Maker
        public async Task<ActionResult> OperationList()
        {
            try
            {
                logerror("OperationList Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("OperationList Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    logerror("ModeofOperation URL " + urlString, "Error");
                    var content = new StringContent(string.Empty);
                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = client.PostAsync(urlString + "ModeofoperationList", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse.Contains("No Data Found!") == false)
                        {
                            List<Modeofoperation_master> mop = JsonConvert.DeserializeObject<List<Modeofoperation_master>>(jsonResponse);
                            logerror("OperationList Response Success", "Response");
                            return View("OperationList", mop);
                        }
                        else
                        {
                            return View("OperationList", null);
                        }

                    }
                    else
                    {
                        ViewBag.ErrorMessage = "An error occurred while fetching data from the API.";
                        return View("OperationList", null);
                    }
                }
            }
            catch (Exception ex)
            {
                logerror("OperationList Action Catch", ex.Message);
                return View();
            }
        }


        public ActionResult Create(int id = 0)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                //ViewBag.Message = "Created";
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Modeofoperation_master model)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    model.CreatedBy = Convert.ToString(Session["uid"]);

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("createdby",model.CreatedBy),
                        new KeyValuePair<string,string>("ref_code",model.Ref_Code),
                        new KeyValuePair<string,string>("ref_desc",model.Ref_Desc),
                    });

                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    HttpResponseMessage response = await client.PostAsync(urlString + "SavemodeofoperationData", content);
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            //ViewBag.Message = jsonResponse;
                            TempData["success"] = "Mode of Operation Created";
                            return RedirectToAction("Create", new { id = 1 });

                            //return View();
                        }

                    }
                    TempData["success"] = "Code Already exist";
                    return RedirectToAction("Create");
                }
                return View();
            }
            catch (Exception ex)
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 2, msg = ex.Message });
            }
        }


        public async Task<ActionResult> Edit(int id, Modeofoperation_master model)
        {
            try
            {
                logerror("Edit Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("Edit Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });

                    HttpResponseMessage response = client.PostAsync(urlString + "GetMOPData", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        Modeofoperation_master mop = JsonConvert.DeserializeObject<Modeofoperation_master>(jsonResponse);
                        return View(mop);
                    }

                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("Edit Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Edit(Modeofoperation_master model)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    model.ModifiedBY = Convert.ToString(Session["uid"]);
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string,string>("modifiedby",model.ModifiedBY),
                        new KeyValuePair<string,string>("id",Convert.ToString(model.Id)),
                        new KeyValuePair<string,string>("ref_code",model.Ref_Code),
                        new KeyValuePair<string,string>("ref_desc",model.Ref_Desc),

                    });

                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateMOPData", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            TempData["success"] = "Mode of Operation Updated";
                            return RedirectToAction("OperationList");
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

        public async Task<ActionResult> Delete(int id, Modeofoperation_master model)
        {
            try
            {
                logerror("Edit Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("Edit Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });

                    HttpResponseMessage response = client.PostAsync(urlString + "GetMOPData", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        Modeofoperation_master mop = JsonConvert.DeserializeObject<Modeofoperation_master>(jsonResponse);
                        return View(mop);
                    }

                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("Edit Action Catch", ex.Message);
                return View();
            }
        }

        [HttpPost]
        public ActionResult Delete(Modeofoperation_master model)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");
                    //var content = new StringContent(string.Empty);
                    //content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "DeleteMOP", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        TempData["success"] = "Mode of Operation Deleted";
                        return RedirectToAction("OperationList");
                    }
                    return RedirectToAction("OperationList");
                }
            }
            catch (Exception ex)
            {
                logerror("EditBranch Action Catch", ex.Message);
                return View();
            }
        }

        public async Task<ActionResult> Details(int id, Branch_Master model)
        {
            try
            {
                logerror("Edit Action", "Start");

                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });

                logerror("Edit Action", "Ending");

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("id",Convert.ToString(model.Id))
                    });

                    HttpResponseMessage response = client.PostAsync(urlString + "GetMOPData", content).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        Modeofoperation_master mop = JsonConvert.DeserializeObject<Modeofoperation_master>(jsonResponse);
                        return View(mop);
                    }

                    return View();
                }
            }
            catch (Exception ex)
            {
                logerror("Edit Action Catch", ex.Message);
                return View();
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