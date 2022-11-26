using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CapstoneProjectLibrary;
using System;

namespace CapstoneProjectAPI.Controllers
{
    public class TodoItemController : Controller
    {
        [Route("getChildItems")]
        [HttpGet]
        public List<ToDoBaseItem> GetChildItems(string parentListId)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                var result = from i in baseContext.ToDoItems
                             where i.ParentListId == parentListId
                             select i;
                var returnList = result.ToList();
                return returnList;
            }
            
        }
        [Route("getItems")]
        [HttpGet]
        public List<ToDoBaseItem> GetItemsWithPagination(int amount, int offset = 0)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
               var returnList = baseContext.ToDoItems.OrderByDescending(item => item.Id).Skip(offset * amount).Take(amount).ToList();
               return returnList;
            }
            
        }

        [Route("editItem")]
        [HttpPost]
        public async Task<IActionResult> PostEditItem( string id, string title = null, string description = null,
            DateTime? duedate=null, DateTime? creationdate=null, ToDoStatus? status=null, string listid=null)
        {
            await BaseItemActions.EditToDoItem(id,title,description,duedate,creationdate,status,listid);
            return Ok();
        }

        [Route("addItem")]
        [HttpPost]
        public async Task<IActionResult> AddItem(string title, string description, DateTime duedate, DateTime creationdate, ToDoStatus status)
        {
            var item = new ToDoBaseItem();

            item.Title = title;
            item.Description = description;
            item.DueDate = duedate;
            item.CreationDate = creationdate;
            item.Status = status;

            var id = await BaseItemActions.AddToDoItem(item);

            return Ok(id);
        }

        [Route("getItemsCount")]
        [HttpGet]
        public int GetCount()
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
              var count =  baseContext.ToDoItems.Count();
               return count;
            }
        }

        [Route("deleteItem")]
        [HttpPost]
        public async Task<IActionResult> DeleteItem(string id)
        {
            await BaseItemActions.DeleteToDoItem(id);

            return Ok();
        }
    }
}
