using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class MakerChekerLimitMaster
    {
        public int ID { get; set; }
        public string BankCode { get; set; }
        public int L1StartLimit { get; set; }
        public int L2StartLimit { get; set; }
        public int L3StartLimit { get; set; }
        public int Pancard_Verf_Limit { get; set; }

        [DisplayName("Color Code")]
        public string Alter_Data_Color { get; set; }
    }
}