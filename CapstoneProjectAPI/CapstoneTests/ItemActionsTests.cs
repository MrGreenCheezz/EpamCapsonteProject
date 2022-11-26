using NUnit.Framework;
using CapstoneProjectLibrary;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace CapstoneTests
{
    internal class ItemActionsTests
    {
        public string Title = "Test1";
        public string Description = "Test1 Description";
        public DateTime DueDate = DateTime.Now;
        public DateTime CreationDate = DateTime.Now;
        public string ParentListId = "0";
        public ToDoStatus Status = ToDoStatus.InProgress;

        [Test]
        public async Task AddItemReturnTestAsync()
        {
            var testItem = new ToDoBaseItem();

            testItem.Title = Title;
            testItem.Description = Description;
            testItem.DueDate = DueDate;
            testItem.CreationDate = CreationDate;
            testItem.ParentListId = ParentListId;
            testItem.Status = Status;

            var returnId = await BaseItemActions.AddToDoItem(testItem);

            Assert.That(returnId != null);

            using (var context = new DataBaseMain())
            {
                var itemTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == returnId);

                context.ToDoItems.Remove(itemTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void AddItemNullTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => await AsyncAddMethod());
        }

        public async Task AsyncAddMethod()
        {
            var returnId = await BaseItemActions.AddToDoItem(null);
        }

        [Test]
        public async Task GetItemReturnTest()
        {
            var testItem = new ToDoBaseItem();

            testItem.Title = Title;
            testItem.Description = Description;
            testItem.DueDate = DueDate;
            testItem.CreationDate = CreationDate;
            testItem.ParentListId = ParentListId;
            testItem.Status = Status;

            var returnId = await BaseItemActions.AddToDoItem(testItem);

            var returnedItem = BaseItemActions.GetItem(returnId);

            Assert.That(returnedItem.Title == Title);
            Assert.That(returnedItem.Description == Description);
            Assert.That(returnedItem.DueDate.Date == DueDate.Date);
            Assert.That(returnedItem.CreationDate.Date == CreationDate.Date);
            Assert.That(returnedItem.ParentListId == ParentListId);
            Assert.That(returnedItem.Status == Status);

            using (var context = new DataBaseMain())
            {
                var itemTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == returnId);

                context.ToDoItems.Remove(itemTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void GetItemReturnExceptionsTest()
        {
            Assert.Throws<ArgumentNullException>(() => { BaseItemActions.GetItem(null); });

            Assert.Throws<ArgumentException>(() => { BaseItemActions.GetItem("99999999999999999999"); });
        }

        [Test]
        public async Task DeleteItemTest()
        {
            var testItem = new ToDoBaseItem();

            testItem.Title = Title;
            testItem.Description = Description;
            testItem.DueDate = DueDate;
            testItem.CreationDate = CreationDate;
            testItem.ParentListId = ParentListId;
            testItem.Status = Status;

            var returnId = await BaseItemActions.AddToDoItem(testItem);

            await BaseItemActions.DeleteToDoItem(returnId);

            using (var context = new DataBaseMain())
            {
                var itemTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == returnId);

                Assert.That(itemTodelete == null);
            }
        }

        [Test]
        public void DeleteItemExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseItemActions.DeleteToDoItem(null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseItemActions.DeleteToDoItem("99999999999999999999"); });
        }

        [Test]
        public async Task CopyItemReturnTest()
        {
            var testItem = new ToDoBaseItem();

            testItem.Title = Title;
            testItem.Description = Description;
            testItem.DueDate = DueDate;
            testItem.CreationDate = CreationDate;
            testItem.ParentListId = ParentListId;
            testItem.Status = Status;

            var returnId = await BaseItemActions.AddToDoItem(testItem);

            var copyId = await BaseItemActions.CopyItem(returnId);

            var getItemActual = BaseItemActions.GetItem(copyId);

            Assert.That(getItemActual != null);

            Assert.That(getItemActual.Title == Title);
            Assert.That(getItemActual.Description == Description);
            Assert.That(getItemActual.DueDate.Date == DueDate.Date);
            Assert.That(getItemActual.CreationDate.Date == CreationDate.Date);
            Assert.That(getItemActual.ParentListId == ParentListId);
            Assert.That(getItemActual.Status == Status);

            using (var context = new DataBaseMain())
            {
                var itemTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == returnId);

                context.ToDoItems.Remove(itemTodelete);

                var copyTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == copyId);

                context.ToDoItems.Remove(copyTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void CopyItemExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseItemActions.CopyItem(null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseItemActions.CopyItem("99999999999999999999"); });
        }

        [Test]
        public async Task EditItemTest()
        {
            var testItem = new ToDoBaseItem();

            testItem.Title = Title;
            testItem.Description = Description;
            testItem.DueDate = DueDate;
            testItem.CreationDate = CreationDate;
            testItem.ParentListId = ParentListId;
            testItem.Status = Status;

            var returnId = await BaseItemActions.AddToDoItem(testItem);

            await BaseItemActions.EditToDoItem(returnId, Title+"Edited", Description + "Edited", DateTime.Now.AddDays(1),
                DateTime.Now.AddDays(1),Status,ParentListId);

            var getItemActual = BaseItemActions.GetItem(returnId);

            Assert.That(getItemActual.Title == Title + "Edited");
            Assert.That(getItemActual.Description == Description + "Edited");
            Assert.That(getItemActual.DueDate.Date == DateTime.Now.AddDays(1).Date);
            Assert.That(getItemActual.CreationDate.Date == DateTime.Now.AddDays(1).Date);
            Assert.That(getItemActual.ParentListId == ParentListId);
            Assert.That(getItemActual.Status == Status);

            using (var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoItems.FirstOrDefault(i => i.Id == returnId);

                context.ToDoItems.Remove(listTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void EditItemExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseItemActions.EditToDoItem(null, null, null, null, null, null, null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseItemActions.EditToDoItem("99999999999999999999", null, null, null, null, null, null); });
        }
    }
}
