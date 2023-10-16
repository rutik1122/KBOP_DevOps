using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class ReasonMaster
    {
        [Display(Name = "Code")]
        public string ReasonCode { get; set; }
        public string Description { get; set; }
        public string oldCode { get; set; }
    }
}