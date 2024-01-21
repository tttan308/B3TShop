# Nội dung đồ án

**1. Hệ thống Chính (Ứng dụng Quản lý)**

- **Chức năng:**
    - Quản lý giỏ hàng, thanh toán, thống kê.
    - CRUD (Tạo, Đọc, Cập nhật, Xóa) cho các danh mục và sản phẩm.
    - Xác thực và phân quyền cho ít nhất 2 loại người dùng.
    - Hiển thị danh sách sản phẩm dạng CardView.
    - Menu phân cấp cho lựa chọn danh mục.
    - Hiển thị chi tiết sản phẩm và sản phẩm liên quan/gợi ý.
    - Chức năng thêm sản phẩm vào giỏ hàng, quản lý giỏ hàng, thanh toán.
    - Validation đầy đủ cho các chức năng.
    - Chức năng lọc và tìm kiếm sản phẩm.
    - Chức năng upload với tính năng preview.
    - Thống kê với biểu đồ.
    - Quản lý (CRUD) cho danh mục, sản phẩm, tài khoản.
    - Phân trang cho danh sách dài.
- **Giao diện:**
    - Layout rõ ràng, ngăn nắp.
    - Font đồng đều, phù hợp.
    - Giao diện riêng biệt cho Admin và Client.
- **Kỹ thuật và Công nghệ:**
    - Mô hình kiến trúc MVC.
    - AJAX cho tương tác nhanh.
    - ExpressJS hoặc tương đương.
    - Database có dữ liệu đầy đủ và có nghĩa.
    - Đăng nhập qua Google/Facebook.
    - Hỗ trợ theme và chủ đề rõ ràng (như Material-UI).

**2. Hệ thống Phụ (Quản lý Thanh toán)**

- **Khởi tạo hệ thống:**
    - Một tài khoản chính để nhận thanh toán từ người dùng.
- **Tài khoản:**
    - Chỉ bao gồm ID và số dư hiện tại.
- **Chức năng:**
    - Thiết kế database cho chức năng thanh toán.
    - Thêm tài khoản cho người dùng mới (từ Hệ thống chính).
    - Đối soát giao dịch thanh toán.
- **Liên kết giữa hai Hệ thống:**
    - Sử dụng WebAPI.
    - Quy trình hợp lý, bảo mật (có xác thực, HTTPS).
    - Sử dụng JWT cho xác thực hệ thống kết nối.

**Yêu cầu Chung:**

- Kiến trúc MVC.
- AJAX.
- Đăng nhập qua Google/Facebook.
- Có up host.
