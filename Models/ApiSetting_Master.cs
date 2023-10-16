using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace iBAS.Models
{
    public class ApiSetting_Master
    {
        public int ID { get; set; }
        public string Api_Name { get; set; }
        public string Api_Value { get; set; }
        [Display(Name = "Description")]
        public string Discription { get; set; }
        public string BankCode { get; set; }
        public string Updated_By { get; set; }
        public DateTime Last_Update_On { get; set; }
    }
}