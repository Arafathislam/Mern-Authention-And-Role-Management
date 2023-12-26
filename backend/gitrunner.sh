#!/bin/bash
yarn test
# output=$(yarn test)
# echo $output
# array=$(declare -p output)
# len=$(declare -a output)

# if [[ "$output" == *"substring"* ]]
# then
#   echo "Substring found."
# else
#   echo "Substring not found."
# fi


# for n in $array;
# do
#    echo $n
# done


read -p 'Commit comment: ' Commit
read -p 'Commit description: ' Description
git add .
git commit -m "$Commit" -m "$Description"
git push


# git rm --cached oops.iso
# git commit --amend -C HEAD
# git rebase --continue
