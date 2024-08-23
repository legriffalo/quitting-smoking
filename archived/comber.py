import os
x = os.listdir('./dist')

s = []

f = open("dependencies.txt", 'w')

for file in x:
    if '.' in file:
        # s.append(file)
        f.write(f'"./dist/{file}"')
        f.write(',\n')
# print(s)

y = os.listdir('./dist/translations')

for file in y:
    if '.' in file:
        # s.append(file)
        f.write(f'"./dist/translations/{file}"')
        f.write(',\n')


f.close()