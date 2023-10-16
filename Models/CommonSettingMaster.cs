using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class CommonSettingMaster
    {
        public int Id { get; set; }
        public string AppName { get; set; }
        public string SettingName { get; set; }
        public string SettingValue { get; set; }
    }
}