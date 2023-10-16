using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Helpers;

namespace iBAS.Models
{
    public class AU_EncryptDecrypt
    {
        // user04
        public string DecryptJsonData(string encryptedData, string encryptionKey)
        {
            try
            {
                string cleanedString = encryptedData.Trim('"');
                var encryptedBytes = Convert.FromBase64String(cleanedString);

                using (var aes = Aes.Create())
                {
                    aes.Mode = CipherMode.CBC;
                    aes.Padding = PaddingMode.PKCS7;
                    aes.Key = Encoding.UTF8.GetBytes(encryptionKey);

                    //var iv = new byte[16];
                    var iv = Encoding.UTF8.GetBytes(encryptionKey);
                    Array.Copy(encryptedBytes, iv, iv.Length);
                    aes.IV = iv;

                    using (var decryptor = aes.CreateDecryptor())
                    {
                        var decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, iv.Length, encryptedBytes.Length - iv.Length);
                        var decryptedString = Encoding.UTF8.GetString(decryptedBytes);

                        // Trim any trailing whitespace or padding
                        var trimmedString = decryptedString.Trim();

                        return "{" + trimmedString;

                        //var decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, iv.Length, encryptedBytes.Length - iv.Length);
                        //return Encoding.UTF8.GetString(decryptedBytes);
                    }
                }
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }


    }
}