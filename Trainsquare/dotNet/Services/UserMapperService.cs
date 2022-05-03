using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Sabio.Services
{
    public class UserMapperService : IUserMapper
    {
        public BaseUserMapper Map(IDataReader reader , ref int index)
        {
            BaseUserMapper user = new BaseUserMapper();
            user.Id = reader.GetSafeInt32(index++);
            user.FirstName = reader.GetSafeString(index++);
            user.LastName = reader.GetSafeString(index++);
            user.AvatarUrl = reader.GetSafeString(index++);

            return user;
        }
    }
}
