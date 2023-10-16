using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class UserMaster
    {
        public Int64 Id { get; set; }
        public string LoginId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; set; }
        public string AccessLevel { get; set; }
        public string Status { get; set; }
        public string L1StartLimit { get; set; }
        public string L1StopLimit { get; set; }
        public string L2StartLimit { get; set; }
        public string L2StopLimit { get; set; }
        public string L3StartLimit { get; set; }
        public string L3StopLimit { get; set; }
    }
}