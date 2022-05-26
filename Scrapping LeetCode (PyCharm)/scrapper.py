import time
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.google.com")

urls = ["https://www.codechef.com/problems/XYSTR",
"https://www.codechef.com/problems/SUBINC"]
cnt=0

for url in urls:
    driver.get(url)
    cnt+=1
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    problem_text = soup.find('div', {"class": "problem-statement"}).get_text()
    # problem_text = problem_text.encode("utf-8")
    # problem_text = str(problem_text)
    print(problem_text)
    # with open("probelm_"+str(cnt)+".txt","w+") as f:
    #     f.write(problem_text)


# //code part is okay
# todo is find sites from where scrapping can be done conveniently
# driver.get("https://www.codechef.com/tags/problems/dynamic-programming")

# time.sleep(5)

# html = driver.page_source
# soup = BeautifulSoup(html, 'html.parser')
# all_ques_div = soup.findAll("div", {"class": "problem-tagbox-inner"})


# all_ques = []

# for ques in all_ques_div:
#     all_ques.append(ques.findAll("div")[0].find("a"))

# print(all_ques)
# # <a href="/problems/XYSTR">Chef and String - XYSTR</a>

# urls = []
# titles = []

# for ques in all_ques:
#     urls.append("https://www.codechef.com"+ques['href'])
#     titles.append(ques.text)
# # with open("problem_urls.txt", "w+") as f:
# # f.write('\n'.join(urls))
# # with open("problem_titles.txt", "w+") as f:
# # f.write('\n'.join(titles))
# time.sleep(5)

# print("sajjad")