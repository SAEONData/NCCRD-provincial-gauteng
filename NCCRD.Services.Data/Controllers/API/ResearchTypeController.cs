﻿using NCCRD.Database.Models;
using NCCRD.Database.Models.Contexts;
using NCCRD.Services.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NCCRD.Services.Data.Controllers.API
{
    /// <summary>
    /// Manage ResearchType data
    /// </summary>
    public class ResearchTypeController : ApiController
    {
        /// <summary>
        /// Get all ResearchType data
        /// </summary>
        /// <returns>ResearchType data as JSON</returns>
        [HttpGet]
        [Route("api/ResearchType/GetAll")]
        public IEnumerable<LookupDataViewModel> GetAll()
        {
            List<LookupDataViewModel> data = new List<LookupDataViewModel>();

            using (var context = new SQLDBContext())
            {
                data = context.ResearchType
                    .OrderBy(x => x.Value.Trim())
                    .Select(x => new LookupDataViewModel()
                    {
                        id = x.ResearchTypeId,
                        value = x.Value
                    })
                    .ToList();
            }

            return data;
        }

        /// <summary>
        /// Add/Update ResearchType
        /// </summary>
        /// <param name="items">list to add/update</param>
        /// <returns>True/False</returns>
        [HttpPost]
        [Route("api/ResearchType/AddOrUpdate")]
        public bool AddOrUpdate([FromBody]List<LookupDataViewModel> items)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                foreach (var item in items)
                {
                    //Check if exists
                    var data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == item.id);
                    if (data != null)
                    {
                        //Update entry
                        data.Value = item.value;
                        //data.Description = item.description;
                    }
                    else
                    {
                        //Add entry
                        context.ResearchType.Add(new ResearchType()
                        {
                            ResearchTypeId = 0,
                            Value = item.value,
                            Description = "" //item.description
                        });
                    }
                }

                context.SaveChanges();
                result = true;
            }

            return result;
        }

        /// <summary>
        /// Delete ResearchType by Id
        /// </summary>
        /// <param name="id">Id of ResearchType to delete</param>
        /// <returns>True/False</returns>
        [HttpGet]
        [Route("api/ResearchType/DeleteById/{id}")]
        public bool DeleteById(int id)
        {
            bool result = false;

            using (var context = new SQLDBContext())
            {
                //Check if exists
                var data = context.ResearchType.FirstOrDefault(x => x.ResearchTypeId == id);
                if (data != null)
                {
                    context.ResearchType.Remove(data);
                    context.SaveChanges();

                    result = true;
                }
            }

            return result;
        }
    }
}