using NUnit.Framework;
using CapstoneProjectLibrary;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace CapstoneTests
{
    internal class ListActionsTests
    {
        [Test]
        public async Task AddListReturnTestAsync()
        {
            var testList = new ToDoBaseList();
            testList.ListTitle = "Test1";
            testList.ListDescription = "Test1 Description";
            var returnId = await BaseListActions.AddToDoListItem(testList);
            Assert.That(returnId != null);
            using(var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == returnId);

                context.ToDoLists.Remove(listTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void AddListNullTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => await AsyncAddMethod());
        }

        public async Task AsyncAddMethod()
        {
            var returnId = await BaseListActions.AddToDoListItem(null);
        }

        [Test]
        public async Task GetListReturnTest()
        {
            var testList = new ToDoBaseList();
            testList.ListTitle = "Test1";
            testList.ListDescription = "Test1 Description";
            var returnId = await BaseListActions.AddToDoListItem(testList);

            var getListActual =  BaseListActions.GetItem(returnId);

            Assert.That(getListActual != null);

            Assert.That(getListActual.ListTitle == "Test1");

            Assert.That(getListActual.ListDescription == "Test1 Description");

            using (var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == returnId);

                context.ToDoLists.Remove(listTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void GetListReturnExceptionsTest()
        {
            Assert.Throws<ArgumentNullException>(() => { BaseListActions.GetItem(null); });

            Assert.Throws<ArgumentException>(() => { BaseListActions.GetItem("99999999999999999999"); });
        }

        [Test]
        public async Task DeleteListTest()
        {
            var testList = new ToDoBaseList();
            testList.ListTitle = "Test1";
            testList.ListDescription = "Test1 Description";
            var returnId = await BaseListActions.AddToDoListItem(testList);

            await BaseListActions.DeleteListItem(returnId);

            using (var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == returnId);

                Assert.That(listTodelete == null);
            }
        }

        [Test]
        public void DeleteListExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseListActions.DeleteListItem(null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseListActions.DeleteListItem("99999999999999999999"); });
        }

        [Test]
        public async Task CopyListReturnTest()
        {
            var testList = new ToDoBaseList();

            testList.ListTitle = "Test1";
            testList.ListDescription = "Test1 Description";

            var returnId = await BaseListActions.AddToDoListItem(testList);

            var copyId = await BaseListActions.CopyList(returnId);

            var getListActual = BaseListActions.GetItem(copyId);

            Assert.That(getListActual != null);

            Assert.That(getListActual.ListTitle == "Test1");

            Assert.That(getListActual.ListDescription == "Test1 Description");

            using (var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == returnId);

                context.ToDoLists.Remove(listTodelete);

                var copyTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == copyId);

                context.ToDoLists.Remove(copyTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void CopyListExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseListActions.CopyList(null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseListActions.CopyList("99999999999999999999"); });
        }

        [Test]
        public async Task EditListTest()
        {
            var testList = new ToDoBaseList();

            string EditedTittle = "EditedTest";
            string EditeDescription = "EditedDescriptionTest";

            testList.ListTitle = "Test1";
            testList.ListDescription = "Test1 Description";

            var returnId = await BaseListActions.AddToDoListItem(testList);

            await BaseListActions.EditListItem(returnId, EditedTittle, EditeDescription, null);

            var getListActual = BaseListActions.GetItem(returnId);

            Assert.That(getListActual != null);

            Assert.That(getListActual.ListTitle == EditedTittle);

            Assert.That(getListActual.ListDescription == EditeDescription);

            Assert.That(!getListActual.IsHiden);

            using (var context = new DataBaseMain())
            {
                var listTodelete = context.ToDoLists.FirstOrDefault(i => i.Id == returnId);

                context.ToDoLists.Remove(listTodelete);

                await context.SaveChangesAsync();
            }
        }
        [Test]
        public void EditListExceptionTest()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => { await BaseListActions.EditListItem(null,null,null,null); });

            Assert.ThrowsAsync<ArgumentException>(async () => { await BaseListActions.EditListItem("99999999999999999999", null,null,null); });
        }
    }
}
