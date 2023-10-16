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
using System.Configuration;
using System.Text;

namespace iBAS.Controllers
{
    public class ApiSettingMasterController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();
        string cs = ConfigurationManager.ConnectionStrings["iKloudProSMBConnectionString"].ConnectionString;
        // GET: Api_Setting_Master
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
                    HttpResponseMessage response = client.PostAsync(urlString + "ApisettingList", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();

                        List<ApiSetting_Master> reasons = JsonConvert.DeserializeObject<List<ApiSetting_Master>>(jsonResponse);
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


        public async Task<ActionResult> Edit(string code, ApiSetting_Master model)
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

                    var content = new FormUrlEncodedContent(new[]
                   {
                       new KeyValuePair<string, string>("id",Convert.ToString(model.ID))

                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetApisettingData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        ApiSetting_Master reason = JsonConvert.DeserializeObject<ApiSetting_Master>(jsonResponse);

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
        public async Task<ActionResult> Edit(ApiSetting_Master model)

        {
            try
            {

                var EncRequestData = Request.Form["EncryptedData"];
                var requestData = new Dictionary<string, string>
                {
                      { "encryptedData", EncRequestData }
                };
                string jsonRequestData = JsonConvert.SerializeObject(requestData);

                using (HttpClient client = new HttpClient())
                {
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                    urlString = urlString.Replace("Scanner", "Master");

                    var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateApiSettingData", content);

                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        BankingAPI bankingAPI = new BankingAPI();
                        string key = bankingAPI.get_BankApi_val(cs, "k_bop");
                        AU_EncryptDecrypt callObj = new AU_EncryptDecrypt();
                        var decryptdata = callObj.DecryptJsonData(jsonResponse, key);
                        if (decryptdata != null)
                        {
                            string resp = decryptdata.Replace("{", "");
                            TempData["success"] = resp;// "Apisetting Updated";
                            //return View();
                            return RedirectToAction("List");
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
    }
}