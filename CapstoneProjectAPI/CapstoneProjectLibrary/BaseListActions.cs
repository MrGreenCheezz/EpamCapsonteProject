using System;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneProjectLibrary
{
    public static class BaseListActions
    {
        public static async Task<string> AddToDoListItem(ToDoBaseList listItem)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                var id = CheckAddingItem(listItem, baseContext);
                baseContext.ToDoLists.Add(listItem);
                await baseContext.SaveChangesAsync();
                return id;
            }
        }

        public static string CheckAddingItem(ToDoBaseList listItem, DataBaseMain baseContext)
        {
            if (listItem == null)
            {
                throw new ArgumentNullException(nameof(listItem), "item cannot be null");
            }

            if (string.IsNullOrEmpty(listItem.Id))
            {
                var list = from i in baseContext.ToDoLists
                           select i;

                int idFirstStep;
                var sortedList = list.OrderByDescending(i => Convert.ToInt32(i.Id));
                try
                {
                    idFirstStep = Convert.ToInt32(sortedList.FirstOrDefault().Id);
                }
                catch
                {
                    idFirstStep = 0;
                }
                var idSecondStep = idFirstStep + 1;

                listItem.Id = idSecondStep.ToString();

                return listItem.Id;
            }

            return "";
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

        public static async Task DeleteListItem(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);

                var listItem = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);

                baseContext.ToDoLists.Remove(listItem);

                await baseContext.SaveChangesAsync();
            }
        }

        public static async Task<string> CopyList(string id)
        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);
                var listItem = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);
                var newItem = listItem;
                newItem.Id = null;
                var newItemId = await AddToDoListItem(listItem);
                return newItemId;
            }
        }

        public static async Task EditListItem(
            string id,
            string title,
            string description,
            bool? isHidden
        )

        {
            using (DataBaseMain baseContext = new DataBaseMain())
            {
                CheckForListItem(id, baseContext);

                var listItem = baseContext.ToDoLists.FirstOrDefault(i => i.Id == id);
                if (title != null)
                {
                    listItem.ListTitle = title;
                }
                if (description != null)
                {
                    listItem.ListDescription = description;
                }
                if (isHidden != null)
                {
                    listItem.IsHiden = (bool)isHidden;
                }

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
