+++
title = "Git push to all remotes"
layout = "post"

+++

If you are trying to host your code redundantly on two git remotes ( say
your personal server, your universities server and/or github ) and you
do not which to manually keep them in sync but pushing everything twice.
There is nice and rather simple way to keep pushing to all of the at
once. Lets imagine your .git/config looks like this:

```
    [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
    [remote "ganymed"]
        url = ganymed:repo/Beleg
        fetch = +refs/heads/*:refs/remotes/ganymed/*
    [remote "hoodie"]
        url = hoodie.de:repo/Beleg
        fetch = +refs/heads/*:refs/remotes/hoodie/*

    In this case you can add a virtual remote (lets call it “all”) that simply looks like this:
    [remote "all"]
        url = ganymed:repo/Beleg
        url = hoodie.de:repo/Beleg
        fetch = +refs/heads/*:refs/remotes/ganymed/*
```

Bear in mind: git pull all will in this case do the same thing as git pull ganymed
