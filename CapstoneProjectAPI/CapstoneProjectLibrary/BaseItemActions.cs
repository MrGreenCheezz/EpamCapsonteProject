using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapstoneProjectLibrary
{
    public static class BaseItemActions
    {
        public static async Task AddToDoItem(ToDoBaseItem item)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckAddingItem(item, baseContext);
                await baseContext.ToDoItems.AddAsync(item);
                await baseContext.SaveChangesAsync();
            }
        }

        public static void CheckAddingItem(ToDoBaseItem item, DataBaseMain baseContext)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "item cannot be null");
            }

            if (string.IsNullOrEmpty(item.Id))
            {
               var temp = int.Parse((from i in baseContext.ToDoItems
                           orderby i.Id descending
                           select i).FirstOrDefault().Id);
                temp += 1;
                item.Id = temp.ToString();
            }
        }

        public static ToDoBaseItem GetItem(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForItem(id, baseContext);
                var item = baseContext.ToDoItems.FirstOrDefault(x => x.Id == id);
                return item;
            }
        }

        public static async Task DeleteToDoItem(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForItem(id, baseContext);

                var item = baseContext.ToDoItems.FirstOrDefault(i => i.Id == id);

                baseContext.ToDoItems.Remove(item);
                await baseContext.SaveChangesAsync();
            }
        }

        public static async Task EditToDoItem(
            string id,
            string title,
            string description,
            DateTime? dueDate,
            DateTime? creationDate,
            ToDoStatus? status,
            string todolistid
        )

        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForItem(id, baseContext);

                var item = baseContext.ToDoItems.FirstOrDefault(i => i.Id == id);

                if (!string.IsNullOrEmpty(title))
                {
                    item.Title = title; 
                }

                if (!string.IsNullOrEmpty(description))
                {
                    item.Description = description; 
                }

                if (dueDate != null)
                {
                    item.DueDate = (DateTime)dueDate;
                }

                if (creationDate != null)
                {
                    item.CreationDate = (DateTime)creationDate;
                }

                if (status != null)
                {
                    item.Status = (ToDoStatus)status;
                }

                if (todolistid != null)
                {
                    item.ParentListId = todolistid; 
                }

                await baseContext.SaveChangesAsync();
            }
        }

        public static void CheckForItem(string id, DataBaseMain baseContext)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            var item = baseContext.ToDoItems.FirstOrDefault(i => i.Id == id);

            if (item == null)
            {
                throw new ArgumentException("No elements with same Id");
            }
        }

        public static async Task AddItemToList(string itemId, string listId)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForItem(itemId, baseContext);
                BaseListActions.CheckForListItem(listId, baseContext);

                var item = baseContext.ToDoItems.FirstOrDefault(i => i.Id == itemId);

                item.ParentListId = listId;

                await baseContext.SaveChangesAsync();
            }
        }
    }
}
