using System;

namespace CapstoneProjectLibrary
{
    public enum ToDoStatus
    {
        NotStarted,
        InProgress,
        Complete
    }

    public class ToDoBaseItem
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        public DateTime CreationDate { get; set; }

        public ToDoStatus Status { get; set; }

        public string ParentListId { get; set; }

    }
}
