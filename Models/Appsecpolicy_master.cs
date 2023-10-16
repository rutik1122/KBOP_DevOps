using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class Appsecpolicy_master
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Pwdexpirydays { get; set; }
        public string Minpwdlenghth { get; set; }
        public string Maxpwdlenghth { get; set; }
        public string Invalidattemtsallowed { get; set; }
        public string Deactivationdays { get; set; }
        public string Updated_By { get; set; }
        //public string Last_Update_On { get; set; }
    }
}