import time
from selenium import webdriver
import shutil
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
#
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
# # driver.get("https://www.google.com")

# urls = ["https://www.codechef.com/problems/XYSTR",
# "https://www.codechef.com/problems/SUBINC"]


# //code part is okay
# todo is find sites from where scrapping can be done conveniently
global_url = []
arr = [2, 3, 4, 5, 6, 7, 8]
arr = [1]
for x in arr:
    driver.get("https://leetcode.com/problemset/all/?difficulty=EASY&page=" + str(x))
    #
    time.sleep(5)
#     #
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # print(html)
    #
    all_ques_div = soup.findAll("div", {"class": "truncate"})
#
    # print(all_ques_div)
    # #
    all_ques = []
    urls = []
    titles = []
    # #
    for ques in all_ques_div:
        all_ques.append(ques.findAll("a")[0])
#     # #
#
    print(len(all_ques))

    for ques in all_ques:
        # print(ques['href'])
        if "opacity-60" in ques['class']:
            # print("abhishant "+ques['href'])
            continue
#
        urls.append("https://leetcode.com" + ques['href'])
        global_url.append("https://leetcode.com" + ques['href'])
        titles.append(ques.text)
# #
    print(titles)
    with open("easy_problem_urls.txt", "a+") as f:
        f.write('\n'.join(urls))
    with open("easy_problem_titles.txt", "a+") as f:
        f.write('\n'.join(titles))
time.sleep(5)

print(len(global_url))
cnt=0
#


# # //topic wise
arr = [1]
for x in arr:
    driver.get("https://leetcode.com/tag/two-pointers/")
    #
    time.sleep(7)
    #
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # print(html)
    #
    # store_tags = []
    # all_ques_div = soup.findAll("span", {"class": "label"})
    # for ques in all_ques_div:
    #     store_tags.append(ques.get_text())

#     # print(store_tags)
# #
    cnt1 = 0
    all_div_doc = soup.findAll("div", {"class": "title-cell__ZGos"})
    print(all_div_doc)

    # //problem title and url
    # //now difficulty and topic -> premium tag
    # #
    all_ques = []
    urls = []
    titles = []
#     # # #
#
    for x in all_div_doc:
        cnt1 = cnt1 + 1

        if x.find("span"):
            continue
            # print(tag)
        link = x.findAll("a")[0]['href']
        title = x.findAll("a")[0].get_text()

        urls.append(link)
        titles.append(title)
        tag = store_tags[cnt1-1]
        if "Easy" in tag:
            urls_easy.append("https://leetcode.com"+link)
            titles_easy.append(title)
        if "Medium" in tag:
            urls_medium.append("https://leetcode.com"+link)
            titles_medium.append(title)
        if "Hard" in tag:
            urls_hard.append("https://leetcode.com"+link)
            titles_hard.append(title)
#
#             # if easy - easy folder me
#             # ? if medium - medium folder me
#             # if hard - hard folder me
#
#         # print(ques.findAll("span", {"class": "label"}))

    # # #
    #
    # print(all_ques)

    # for ques in all_ques:
    # print(ques['href'])
    # if "opacity-60" in ques['class']:
    #     # print("abhishant "+ques['href'])
    #     continue
#
urls.append("https://leetcode.com" + ques['href'])
global_url.append("https://leetcode.com" + ques['href'])
titles.append(ques.text)
#
#     # print(titles)
#
print(store_tags)
print(titles_easy)
print(titles_hard)
print(titles_medium)
# print(cnt1)
# tags_final = []
# for x in store_tags:
#     if x == "":
#         continue
#     tags_final.append(x)
# #
with open("All_problems/Problems/problem_url.txt", "a+") as f:
    f.write('\n'.join(urls_easy))
with open("two_pointers_dsa/easy_tag/problem_titles.txt", "a+") as f:
    f.write('\n'.join(titles_easy))

with open("two_pointers_dsa/medium_tag/problem_url.txt", "a+") as f:
    f.write('\n'.join(urls_medium))
with open("two_pointers_dsa/medium_tag/problem_titles.txt", "a+") as f:
    f.write('\n'.join(titles_medium))

with open("two_pointers_dsa/hard_tag/problem_url.txt", "a+") as f:
    f.write('\n'.join(urls_hard))
with open("two_pointers_dsa/hard_tag/problem_titles.txt", "a+") as f:
    f.write('\n'.join(titles_hard))
# # time.sleep(5)
#
file1 = open('two_pointers_dsa/easy_tag/problem_url.txt', 'r')
Lines = file1.readlines()
cnt = 0
# Strips the newline character
for line in Lines:

    cnt += 1
    if cnt <= 30:
        continue
    driver.get(line)
    time.sleep(3)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    problem_text = soup.find('div', {"class": "content__u3I1"}).get_text()
    # problem_text = problem_text.encode("utf-8")
    # problem_text = str(problem_text)
    print(problem_text)
    with open("two_pointers_dsa/easy_tag/problem_statement/probelm_" + str(cnt) + ".txt", "w+") as f:
        f.write(problem_text)
# # #
file1 = open('two_pointers_dsa/medium_tag/problem_url.txt', 'r')
Lines = file1.readlines()
cnt = 0
# # Strips the newline character
for line in Lines:
    cnt += 1
    if cnt <= 30:
        continue
    driver.get(line)

    time.sleep(3)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    problem_text = soup.find('div', {"class": "content__u3I1"}).get_text()
    # problem_text = problem_text.encode("utf-8")
    # problem_text = str(problem_text)
    print(problem_text)
    with open("two_pointers_dsa/medium_tag/problem_statement/probelm_" + str(cnt) + ".txt", "w+") as f:
        f.write(problem_text)

file1 = open('strings_dsa/hard_tag/problem_url.txt', 'r')
Lines = file1.readlines()
cnt = 0
# Strips the newline character
for line in Lines:

    cnt += 1
    if cnt <= 33:
        continue

    driver.get(line)
    time.sleep(3)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    problem_text = soup.find('div', {"class": "content__u3I1"}).get_text()
    problem_text = problem_text.encode("utf-8")
    # problem_text = str(problem_text)
    print(problem_text)
    with open("strings_dsa/hard_tag/problem_statement/probelm_" + str(cnt) + ".txt", "w+") as f:
        f.write(problem_text)
# #

# //todo: first read each small folder
# //easy tag
# -> problem url
# -> problem title
# -> problem statement

prev = 0
x = 37+12+73
y = 0+37+12
topic = "two_pointers_dsa"
difficulty = "medium_tag"
#
# file1 = open('test.txt, 'r')
Lines = file1.readlines()
# Strips the newline character
for line in Lines:
    # cnt += 1
    # if cnt > x:
    #     break

    with open("/Problems_titles/problem_title_" + str(cnt+prev) + ".txt", "a+") as f:
        f.write(line)
#
file1 = open(topic+'/'+difficulty+'/problem_url.txt', 'r')
Lines = file1.readlines()
# Strips the newline character
for line in Lines:
    cnt += 1
    if cnt > x:
        break
    with open("All_Problems_set/Problems_links/problem_url_" + str(cnt+prev) + ".txt", "a+") as f:
        f.write(line)

cnt = y
# Strips the newline character
for x in range(y, x):
    cnt += 1
    original = r'/Users/abk45/PycharmProjects/pythonProject/'+topic+'/'+difficulty+'/problem_statement/probelm_'+str(cnt-y)+'.txt'
    target = r'/Users/abk45/PycharmProjects/pythonProject/All_Problems_set/Problems_description/problem_'+str(cnt+prev)+'.txt'
    shutil.copyfile(original, target)
#
#
#
