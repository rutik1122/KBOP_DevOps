using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace iBAS.Models
{
    public class AD_Encrypt
    {
        public class EncryptDecryptString
        {
            private static readonly string characterEncoding = "UTF-8";
            private static readonly string cipherTransformation = "AES/CBC/PKCS5PADDING";
            private static readonly string aesEncryptionAlgorithm = "AES";

            public string Encrypt(string plainText, string encKey)
            {
                string encryptedText = "";
                try
                {
                    using (AesManaged aes = new AesManaged())
                    {
                        byte[] key = Encoding.UTF8.GetBytes(encKey);
                        byte[] iv = Encoding.UTF8.GetBytes(encKey);

                        aes.Mode = CipherMode.CBC;
                        aes.Padding = PaddingMode.PKCS7;
                        aes.Key = key;
                        aes.IV = iv;

                        ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                        byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                        byte[] cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                        encryptedText = Convert.ToBase64String(cipherBytes);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Encrypt Exception: " + e.Message);
                }
                return encryptedText;
            }

            public static string Decrypt(string encryptedText, string decKey)
            {
                string decryptedText = "";
                try
                {
                    using (AesManaged aes = new AesManaged())
                    {
                        byte[] key = Encoding.UTF8.GetBytes(decKey);
                        byte[] iv = Encoding.UTF8.GetBytes(decKey);

                        aes.Mode = CipherMode.CBC;
                        aes.Padding = PaddingMode.PKCS7;
                        aes.Key = key;
                        aes.IV = iv;

                        ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                        byte[] cipherBytes = Convert.FromBase64String(encryptedText);
                        byte[] plainBytes = decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);

                        decryptedText = Encoding.UTF8.GetString(plainBytes);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Decrypt Exception: " + e.Message);
                }
                return decryptedText;
            }
        }
    }
}