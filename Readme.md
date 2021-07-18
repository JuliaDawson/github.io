#GitHub commands https://docs.github.com/en/github/managing-files-in-a-repository/managing-files-using-the-command-line/adding-a-file-to-a-repository-using-the-command-line
#Adding a file to a repository using the Command Line 
#1. On your computer, move the file you'd like to upload to GitHub into the local directory that was created when you cloned the repository.
#2. Open Git Bash 
#3. Change to working directory of your local repository.  cd c:/users/julia/OneDrive/Documents/GitHub
#4. Stage the file for commit to your local repository 
$ git add .
# Adds the file to your local repository and stages it for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
#5. Commit the file that you've staged to your local repository. 
$ git commit -m "Add existing file"
# Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
#6. Push the changes in your local repository to GitHub https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository git push origin your-branch  
$ git push origin main
# Pushes the changes in your local repository up to the remote repository you specified as the origin