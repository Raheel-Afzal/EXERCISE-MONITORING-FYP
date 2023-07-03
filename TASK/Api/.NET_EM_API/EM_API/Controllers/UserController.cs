using EM_API.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace EM_API.Controllers
{
    public class UserController : ApiController
    {
        EM_Entities db = new EM_Entities();
        
        [HttpGet]
        public HttpResponseMessage getUser(string email,string password)
        {
            try
            {
                var result = db.Users.Where(s=>s.email==email && s.password==password).Select(s => new { s.uid, s.email, s.password, s.profilePic, s.gender, s.age, s.height, s.weight, s.bmi }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        public HttpResponseMessage addUser()
        {
            try
            {           
                var form = HttpContext.Current.Request.Form;            
                string name = form["name"];
                string email = form["email"];
                string password = form["password"];
                string gender = form["gender"];
                string age = form["age"];
                string height= form["height"];
                string weight = form["weight"];
                string bmi = form["bmi"];
                var files = HttpContext.Current.Request.Files;
                DateTime dt = DateTime.Now;
                string fname = dt.Year + "" + dt.Month + "" + dt.Day + "" + dt.Minute + "" + dt.Second + "" + dt.Hour;
                string path = HttpContext.Current.Server.MapPath("~/UserImages");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string fileData = null;
                for (int i = 0; i < files.Count; i++)
                {
                    fileData = fname + files[i].FileName;
                    files[i].SaveAs(path + "\\" + fileData);
                }
                User user = new User();
                user.name= name;
                user.email=email;
                user.password = password;
                user.gender = gender;  
                user.age = age;
                user.height = height;
                user.weight = weight;
                user.bmi = bmi;
                user.profilePic = fileData;
                db.Users.Add(user);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Account Created");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPut]
        public HttpResponseMessage UpdateUser(User getUser)
        {
            try
            {
                User user = db.Users.Where(u => u.uid == getUser.uid).FirstOrDefault();
                user.name = getUser.name;
                user.email = getUser.email;
                user.password = getUser.password;
                user.profilePic = getUser.profilePic;
                user.gender = getUser.gender;
                user.age = getUser.age;
                user.height = getUser.height;
                user.weight = getUser.weight;
                user.bmi = getUser.bmi;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Account Information updated sucessfully");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }
        [HttpDelete]
        public HttpResponseMessage deleteUser(int id)
        {
            try
            {
                User user = db.Users.Where(s => s.uid == id).FirstOrDefault();
                List<ProgressPhoto> pp = db.ProgressPhotos.Where(s => s.uid == user.uid).ToList();
                db.Users.Remove(user);
                foreach (var item in pp)
                {
                    db.ProgressPhotos.Remove(item);
                }
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Your Account has been Deleted");
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
