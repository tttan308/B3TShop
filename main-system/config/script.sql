-- Tạo bảng Users
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    UserType VARCHAR(50),
    AuthenticationType VARCHAR(50),
    AuthProviderID VARCHAR(255),
    AuthProviderToken VARCHAR(255),
    DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Categories
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Tạo bảng Products
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryID INT,
    ImageURL TEXT,
    FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID)
);

-- Tạo bảng Cart
CREATE TABLE Cart (
    CartID SERIAL PRIMARY KEY,
    UserID INT UNIQUE NOT NULL,
    DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

-- Tạo bảng CartItems
CREATE TABLE CartItems (
    CartItemID SERIAL PRIMARY KEY,
    CartID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Cart (CartID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);

-- Tạo bảng Orders
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    OrderDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

-- Tạo bảng OrderDetails
CREATE TABLE OrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);

-- Tạo bảng PaymentAccounts
CREATE TABLE PaymentAccounts (
    AccountID SERIAL PRIMARY KEY,
    UserID INT UNIQUE NOT NULL,
    Balance DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

-- Tạo bảng Transactions
CREATE TABLE Transactions (
    TransactionID SERIAL PRIMARY KEY,
    AccountID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    TransactionDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AccountID) REFERENCES PaymentAccounts (AccountID)
);

-- Tạo bảng AuditLogs
CREATE TABLE AuditLogs (
    LogID SERIAL PRIMARY KEY,
    TransactionID INT,
    AuditDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(255),
    CreatedBy VARCHAR(255),
    CreatedAt TIMESTAMP,
    UpdatedBy VARCHAR(255),
    UpdatedAt TIMESTAMP,
    ActionDescription TEXT,
    FOREIGN KEY (TransactionID) REFERENCES Transactions (TransactionID)
);

-- Tạo bảng TokenLogs
CREATE TABLE TokenLogs (
    TokenLogID SERIAL PRIMARY KEY,
    Token VARCHAR(255) NOT NULL,
    IssuedToSystem VARCHAR(255),
    IssuedDate TIMESTAMP NOT NULL,
    ExpiryDate TIMESTAMP NOT NULL
);
