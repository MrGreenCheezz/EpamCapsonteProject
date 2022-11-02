using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapstoneProjectLibrary
{
    public static class BaseListActions
    {
        public static async Task AddToDoListItem(ToDoBaseList listItem)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckAddingItem(listItem, baseContext);
                baseContext.ToDoLists.Add(listItem);
                await baseContext.SaveChangesAsync();
            }
        }

        public static void CheckAddingItem(ToDoBaseList listItem, DataBaseMain baseContext)
        {
            if (listItem == null)
            {
                throw new ArgumentNullException(nameof(listItem), "item cannot be null");
            }

            if (string.IsNullOrEmpty(listItem.Id))
            {
                listItem.Id = (baseContext.ToDoLists.Count() + 1).ToString();
            }
        }

        public static ToDoBaseList GetItem(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);
                var listItem = baseContext.ToDoLists.FirstOrDefault(x => x.Id == id);
                return listItem;
            }
        }

        public static async Task DeleteToDoItem(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);

                var listItem = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);

                baseContext.ToDoLists.Remove(listItem);

                await baseContext.SaveChangesAsync();
            }
        }

        public static async Task EditToDoItem(
            string id,
            string title,
            string description         
        )

        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);

                var listItem = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);

                listItem.ListTitle = title;
                listItem.ListDescription = description;
             
                await baseContext.SaveChangesAsync();
            }
        }

        public static void CheckForListItem(string id, DataBaseMain baseContext)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            var item = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);

            if (item == null)
            {
                throw new ArgumentException("No elements with same Id");
            }
        }
    }
}
