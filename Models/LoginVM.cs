using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class LoginVM
    {
        public string loginid { get; set; }
        public string password { get; set; }
    }

    public class PasswordModel
    {
        public string OldPassword { get; set; }
        public string NewPassword1 { get; set; }
        public string NewPassword2 { get; set; }
    }

    public class k_bop_api
    {

        public string password { get; set; }
        public string username { get; set; }

        public string grant_type { get; set; }
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string expires_in { get; set; }
        public string errorMsg { get; set; }
        public string Encryption_Key { get; set; }

    }
}