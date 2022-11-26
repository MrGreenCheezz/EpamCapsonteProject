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
        public async Task<IActionResult> PostEditList(string id, string title = null, string description = null, bool? ishidden = null)
        {
            await BaseListActions.EditListItem(id, title, description, ishidden);
            return Ok();
        }

        [Route("copyList")]
        [HttpPost]
        public async Task<IActionResult> CopyList(string id, bool withItems)
        {
            if (withItems)
            {
                using (DataBaseMain baseContext = new DataBaseMain())
                {

                    var listItems = (from i in baseContext.ToDoItems
                                 where i.ParentListId == id
                                 select i).ToList();
                    var newListId = await BaseListActions.CopyList(id);
                    foreach(var item in listItems)
                    {
                        var newItemId = await BaseItemActions.CopyItem(item.Id);
                        await BaseItemActions.EditToDoItem(newItemId, null, null, null, null, null, newListId);
                    }
                    return Ok();
                }
            }
            else
            {
                using(DataBaseMain baseContext = new DataBaseMain())
                {
                    await BaseListActions.CopyList(id);
                    return Ok();
                }
            }
        }

        [Route("addList")]
        [HttpPost]
        public async Task<IActionResult> AddList(string title, string description)
        {
            var item = new ToDoBaseList();

            item.ListTitle = title;
            item.ListDescription = description;


            var id = await BaseListActions.AddToDoListItem(item);

            return Ok(id);
        }

        [Route("getListsCount")]
        [HttpGet]
        public int GetCount()
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                var count = baseContext.ToDoLists.Count();
                return count;
            }
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
