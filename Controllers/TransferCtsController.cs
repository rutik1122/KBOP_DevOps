using Emgu.CV;
using Emgu.CV.Structure;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace iBAS.Controllers
{
    public class TransferCtsController : Controller
    {
        ErrorController err = new ErrorController();
        string urlString = System.Configuration.ConfigurationManager.AppSettings["APIURL"].ToString();
        string WebImageURL = System.Configuration.ConfigurationManager.AppSettings["WebImageURL"].ToString();
        string PhysicalImageURL = System.Configuration.ConfigurationManager.AppSettings["PhysicalImageURL"].ToString();

        // GET: TransferCts
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Transfer(string Name = null)
        {
            try
            {
                if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
                {
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
                }

                if(Convert.ToBoolean(Session["ctsmaker"]) == false && Name == "CTS")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                if (Convert.ToBoolean(Session["transfermaker"]) == false && Name == "TRF")
                    return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

                if (Name == "TRF")
                {
                    return RedirectToAction("TrfSelectionPage");
                    //ViewBag.TitleName = "Transfer Cheque";
                }
                else if (Name == "CTS")
                {
                    return RedirectToAction("CtsSelectionPage");
                    //ViewBag.TitleName = "CTS Cheque";
                }
                else if (Name == "CI")
                {
                    return RedirectToAction("CISelectionPage", "CI_DI_Form");
                }
                else if (Name == "DI")
                {
                    return RedirectToAction("DISelectionPage", "CI_DI_Form");
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


        [HttpGet]
        public ActionResult CtsSelectionPage()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["ctsmaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            //string accept = "S|200|transaction success";
            //string[] acc = accept.Split('|');

            //string aj1 = acc[0];
            //string aj2 = acc[1];
            //string aj3 = acc[2];

            return View();
        }


        [HttpPost]
        public ActionResult CtsSelectionPage(string Clearing_Type = null, string Scanning_Type = null)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            if (Clearing_Type != null || Clearing_Type != "")
                Session["ClearingType"] = Clearing_Type;
            if (Scanning_Type != null || Scanning_Type != "")
                Session["ScanningType"] = Scanning_Type;

            if (Clearing_Type == "01")
                ViewBag.TitleName = "CTS Clearing";
            else if (Clearing_Type == "99")
                ViewBag.TitleName = "Special Clearing";

            ViewBag.Scanning_Type = Scanning_Type;

            //if (Scanning_Type == "1")
            //{
            //    ViewBag.Scanning_Type = "1";
            //    ViewBag.SubTitleName = "Retail with Slip";
            //}
            //else if (Scanning_Type == "2")
            //{
            //    ViewBag.Scanning_Type = "2";
            //    ViewBag.SubTitleName = "Retail without Slip";
            //    //return View("CTS_L1");
            //}
            //else if (Scanning_Type == "3")
            //{
            //    ViewBag.Scanning_Type = "3";
            //    ViewBag.SubTitleName = "P2F Retail without Slip";
            //    //return View("CTS_L1");
            //}


            return View("CTS_L1");
            //return View("CTS");
        }
        

        public string ImageToBase64CompressTiff(string imgpath)
        {
            try
            {
                //byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(imgpath);

                //string returnValue = System.Convert.ToBase64String(toEncodeAsBytes);

                string ImageName = imgpath.Replace("//", "").Replace("/", "").Replace(".", "").Replace(":", "");


                ImageCodecInfo imageCodecInfo = GetEncoderInfo("image/tiff");
                System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Compression;
                EncoderParameters myEncoderParameters = new EncoderParameters(1);
                EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, System.Convert.ToInt64(EncoderValue.CompressionCCITT4));
                myEncoderParameters.Param[0] = myEncoderParameter;
                using (MemoryStream _mStream = new MemoryStream())
                {
                    string _base64String = null;
                    Bitmap ImageSource;
                    byte[] imageAsByteArray;


                    if (imgpath.Contains("http") == true)
                    {
                        //byte[] imageAsByteArray;
                        using (var webClient = new WebClient())
                        {
                            // ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072;
                            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
                            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;


                            imageAsByteArray = webClient.DownloadData(imgpath.Replace("\\", "/"));
                            MemoryStream imageStream = new MemoryStream(imageAsByteArray);
                            ImageSource = new Bitmap(imageStream);
                            imageStream.Dispose();
                        }
                    }
                    else
                    {
                        ImageSource = new Bitmap(imgpath);
                        //ImageSource = returnValue.ToBitmap();
                    }



                    int imgH = 716; //ImageSource.Height;
                    int imgW = 1584; //ImageSource.Width;
                    Bitmap bm = new Bitmap(imgW, imgH);

                    Image<Gray, byte> grayImage = new Image<Gray, byte>(ImageSource);
                    Image<Gray, byte> TiffImage = grayImage.Resize(imgW, imgH, Emgu.CV.CvEnum.Inter.Linear);//this is image with resize
                    TiffImage = TiffImage.ThresholdBinary(new Gray(120), new Gray(250)); // old standard value 120,250  //new new Gray(105), new Gray(250)
                    bm = TiffImage.ToBitmap();


                    bm.SetResolution(200, 200);

                    string imgNameWithPath = ImageName + ".tiff";

                    bm.Save(@"C:\SIM\Data\" + imgNameWithPath, imageCodecInfo, myEncoderParameters);
                    //bm.Save(@"C:\SIM\Data\pg2tiff.tiff", imageCodecInfo, myEncoderParameters);

                    //bm.Save(_mStream, imageCodecInfo, myEncoderParameters);
                    bm.Dispose();

                    ImageSource = new Bitmap(@"C:\SIM\Data\" + imgNameWithPath);



                    System.IO.MemoryStream stream = new System.IO.MemoryStream();
                    ImageSource.Save(stream, System.Drawing.Imaging.ImageFormat.Bmp);
                    stream.Position = 0;

                    byte[] data = new byte[stream.Length];
                    int lngth = (int)stream.Length;
                    stream.Read(data, 0, lngth);
                    stream.Close();

                    stream.Dispose();


                    _base64String = Convert.ToBase64String(data);
                    Array.Clear(data, 0, data.Length);

                    ImageSource.Dispose();
                    grayImage.Dispose();
                    TiffImage.Dispose();
                    GC.Collect();


                    //return "data:image/jpg;base64," + _base64String;

                    string imageDataURL = string.Format("data:image/png;base64,{0}", _base64String);
                    return imageDataURL;
                    //return "data:image/(png|jpg|tiff);base64," + _base64String;
                }

            }
            catch (Exception e)
            {

                string sInnerException = "";
                if (e.InnerException != null)
                {
                    sInnerException = e.InnerException.Message.ToString();
                }

                //WriteErrorLog("PostData error: " + e.Message, sInnerException);
                return null;
            }

        }

        private ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            try
            {
                int j;
                ImageCodecInfo[] encoders;
                encoders = ImageCodecInfo.GetImageEncoders();
                for (j = 0; j <= encoders.Length - 1; j++)
                {
                    if (encoders[j].MimeType == mimeType)
                        return encoders[j];
                }
                return null/* TODO Change to default(_) if this is not a reference type */;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        [HttpGet]
        public ActionResult TrfSelectionPage()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transfermaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            return View();
        }


        [HttpPost]
        public ActionResult TrfSelectionPage(string Transaction_Type = null, string Scanning_Type = null)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transfermaker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.TitleName = "Transfer Cheque";
            ViewBag.ScanningType = Scanning_Type;
            ViewBag.Credit_Type = Transaction_Type;

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            string bcode = Session["BankCode"].ToString();

            //if (Scanning_Type == "1")
            //{
            //    ViewBag.SubTitleName = "Retail with Slip";
            //    return View("TRF01_L1");
            //}
            if (Scanning_Type == "2")
            {
                ViewBag.SubTitleName = "Retail without Slip";
                return View("TRF02_L1");
            }
            else if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5")
            {
                if (bcode == "240")
                    return View("Transfer_L1_240");
                else
                    return View("Transfer_L1");
            }

            return View("Transfer");
        }


        [HttpGet]
        public ActionResult TrfCheckerList()
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transferchecker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.TitleName = "Transfer Checker Module";
            

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            return View();
        }


        [HttpGet]
        public ActionResult TrfVerificationForm(string verf, string cid)
        {
            if (Convert.ToString(Session["Login_Page_Id"]) == null || Convert.ToString(Session["Login_Page_Id"]) == "")
            {
                return RedirectToAction("LoginiBAS", "Home", new { cond = 1 });
            }

            if (Convert.ToBoolean(Session["transferchecker"]) == false)
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            ViewBag.URL = urlString;
            ViewBag.WebImageURL = WebImageURL;
            ViewBag.PhysicalImageURL = PhysicalImageURL;

            ViewBag.cid = cid;
            ViewBag.TitleName = "Transfer Checker Module";

            if (verf == "1")
            {
                ViewBag.SubTitleName = "L1 Verification";
                ViewBag.VerfLevel = "L2";
                return View("TrfVerificationForm");
            }
            else if (verf == "2")
            {
                ViewBag.SubTitleName = "L2 Verification";
                ViewBag.VerfLevel = "L3";
                return View("TrfVerificationForm");
            }
            else
                return RedirectToAction("LoginiBAS", "Home", new { cond = 4 });

            //return View();
        }


        public ActionResult RollbackForm(string id, string refno, string transType)
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

                if (transType == "TRF02")
                {
                    return View("TRF02RollBack");
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