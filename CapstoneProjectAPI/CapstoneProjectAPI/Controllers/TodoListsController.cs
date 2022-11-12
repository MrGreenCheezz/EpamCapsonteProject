using CapstoneProjectLibrary;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProjectAPI.Controllers
{
    public class TodoListsController : Controller
    {

        [Route("getLists")]
        [HttpGet]
        public List<ToDoBaseList> GetListsWithPagination(int amount, int offset = 0)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                var returnList = baseContext.ToDoLists.OrderByDescending(item => item.Id).Skip(offset * amount).Take(amount).ToList();
                return returnList;
            }
            
        }
        [Route("editList")]
        [HttpPost]
        public async Task<IActionResult> PostEditList(string id, string title = null, string description = null)
        {
            await BaseListActions.EditListItem(id, title, description);
            return Ok();
        }

        [Route("addList")]
        [HttpPost]
        public async Task<IActionResult> AddList(string title, string description)
        {
            var item = new ToDoBaseList();

            item.ListTitle = title;
            item.ListDescription = description;


            await BaseListActions.AddToDoListItem(item);

            return Ok();
        }

        [Route("deleteList")]
        [HttpPost]
        public async Task<IActionResult> DeleteList(string id)
        {
            await BaseListActions.DeleteListItem(id);

            return Ok();
        }
    }
}
