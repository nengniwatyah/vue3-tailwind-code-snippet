# ==============================================
# Docker Cheat Sheet
# ==============================================
# 
# 1. สร้างและรัน Docker Container
#    docker build -t image-name .             # สร้าง image จาก Dockerfile
#    docker run -p 5500:5500 image-name         # รัน container โดยแม็พพอร์ต 5500(host):5500(container)
#    docker run -d image-name                 # รันในโหมด background
#    docker run -it image-name /bin/bash      # เข้าไปใน container
# 
# 2. จัดการ Containers
#    docker ps                                # แสดง container ที่กำลังรันอยู่
#    docker ps -a                             # แสดง container ทั้งหมด
#    docker stop <container-id>               # หยุด container
#    docker rm <container-id>                 # ลบ container
#    docker rm -f <container-id>              # บังคบลบ container
#    docker logs <container-id>               # ดู logs
#    docker exec -it <container-id> /bin/bash # เข้าไปใน container ที่กำลังรันอยู่
# 
# 3. จัดการ Images
#    docker images                           # แสดง images ทั้งหมด
#    docker rmi <image-id>                   # ลบ image
#    docker rmi -f <image-id>                # บังคบลบ image
#    docker pull <image-name>                # ดึง image จาก Docker Hub
# 
# 4. เครือข่ายและโวลุ่ม
#    docker network ls                       # แสดงเครือข่ายทั้งหมด
#    docker volume ls                        # แสดง volumes ทั้งหมด
#    docker run -v /host/path:/container/path # Mount volume
#
# ==============================================
# Dockerfile สำหรับโปรเจคนี้
# ==============================================
# รันบน terminal ด้วย docker run -d -p 5500:5500 vue-code-snippet ทุกครั้งที่จะรัน preview

# ใช้ Node.js image
FROM node:20

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดจากเครื่องคุณไปใน container
COPY . .

# ล้าง cache และติดตั้ง dependencies ใหม่
RUN rm -rf node_modules package-lock.json
RUN npm install

# เปิดพอร์ตของ dev server (Vite ใช้ 5500)
EXPOSE 5500

# เริ่มรันแอป
CMD ["npm", "run", "dev"]