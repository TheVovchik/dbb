# General functionality guide

After installing application and running install and dev commands open [http://localhost:3000](http://localhost:3000) with your browser.

If you don't have a valid access token, the page will redirect you to dropbox authorization link where you need to log in to the Dropbox service and after confirm access for this application to your data (it's totally safe).

After confirmation it will redirect you to the `/token/[your token]` page and store your access token in local storage, after you will be authomatically redirected to the `/app` route.

In dropbox Api uses an OAuth 2 scope to allow access. 

On the board you will have `Left menu`, `Action bar` and `File explorer`.

If you have `<folder is empty>` it's means that in current folder you have no subfolder and no files.

Use `create folder` button to create a folder in place, just type it's name in corresponded input.

Use `upload file` button to upload a file (implemented logic without streams, so please don't try to upload file more than 150Mb).

After successful upload or creation of folder the app will show success toast and reload a page. If error will happen it will show error toast.

> if you try to create a file or a folder in subfolder it will trow an error because of

```bash
The given OAuth 2 access token is malformed
```
> it's connected with some API issues. I find several topic's dated on march'23. Probably this problem doesn't exist with Business Account or production mode. This tip is to concern, because of the test function explorer form in developer dropbox add folder and files.

To test how the explorer works you can manually add subfolders and files in it, and they will appear in app after reload. Dropbox API give possibility to implement on change listeners (not used in app).

To navigate through folders you can click on folder or on breadcrumb item.

Application can have a wide functionality field according to dropbox api possibilities. They have all CRUD functionality and a lot of information API endpoints.

Also according even to [dropbox.com/home](https://dropbox.com/home) UI we can display files according to our needs: only photo, only docs etc.

# Summary

According to test task the app have a file explorer with own navigation through breadcrumb menu and by clicking on folders to open them.

On left menu you can click `Home` link to fast navigate in root folder.

An images will be shown with corresponding thumbnails.

App use Dropbox API possibilities and implements it's OAuth logic.

We have two functional buttons to `upload file` file and `create folder` with corresponding input for folder name.

`Delete selected` button logic (currently not implemented) will have next steps:
- add checkbox to files and folders
- checked items will be added to the delete array
- on click the butch delete function with all paths will be called.

On `left menu` I left non implemented
> `All files` by clicking should show all files in all folders in explorer

> `Latest` should show all files sorted by date

> `Selected` should show all selected files by creating a corresponding list

> `Photos` should show only files with type `image/`

