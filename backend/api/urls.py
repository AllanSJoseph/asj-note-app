from django.urls import path
from .views import CreateUserView, NoteListCreate, NoteDelete, NoteUpdate


 # Or import any views you want to expose here

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path("notes/", NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", NoteDelete.as_view(), name="delete-note"),
    path("notes/update/<int:pk>", NoteUpdate.as_view(), name="update-note"),
]
