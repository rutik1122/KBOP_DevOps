using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using iBAS.Models;

namespace iBAS.Controllers
{
    public class MakerCheckerLimitController : Controller
    {
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();

        // GET: CheckerLimit
        public async Task<ActionResult> Edit(MakerChekerLimitMaster model, string msg)
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
                        new KeyValuePair<string,string>("bankCode",Session["BankCode"].ToString()),

                    });
                    HttpResponseMessage response = client.PostAsync(urlString + "GetCheckerLimitData", content).Result;
                    if (response.IsSuccessStatusCode)
                    {

                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        MakerChekerLimitMaster reason = JsonConvert.DeserializeObject<MakerChekerLimitMaster>(jsonResponse);

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
        public async Task<ActionResult> Edit(MakerChekerLimitMaster model)
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
                        new KeyValuePair<string,string>("bankcode",model.BankCode.ToString()),
                        new KeyValuePair<string,string>("l1startlimit",model.L1StartLimit.ToString()),
                        new KeyValuePair<string,string>("l2startlimit",model.L2StartLimit.ToString()),
                        new KeyValuePair<string,string>("l3startlimit",model.L3StartLimit.ToString()),
                        new KeyValuePair<string,string>("pancard_verf_limit",model.Pancard_Verf_Limit.ToString()),
                        new KeyValuePair<string,string>("alter_data_color",model.Alter_Data_Color.ToString()),
                    });

                    HttpResponseMessage response = await client.PostAsync(urlString + "UpdateCheckerData", content);

                    if (response.IsSuccessStatusCode)
                    {
                        string jsonResponse = await response.Content.ReadAsStringAsync();
                        if (jsonResponse != null)
                        {
                            TempData["success"] = "Data Updated Successfully";
                            return RedirectToAction("Edit");
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