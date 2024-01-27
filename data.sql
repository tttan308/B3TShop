PGDMP     -    9                 |            B3TShop    15.4    15.4 D    H           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            I           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            J           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            K           1262    23940    B3TShop    DATABASE     �   CREATE DATABASE "B3TShop" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "B3TShop";
                postgres    false            �            1259    24018 	   CartItems    TABLE     �   CREATE TABLE public."CartItems" (
    "CartItemID" integer NOT NULL,
    "CartID" integer,
    "ProductID" integer,
    "Quantity" integer
);
    DROP TABLE public."CartItems";
       public         heap    postgres    false            �            1259    24017    CartItems_CartItemID_seq    SEQUENCE     �   CREATE SEQUENCE public."CartItems_CartItemID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."CartItems_CartItemID_seq";
       public          postgres    false    227            L           0    0    CartItems_CartItemID_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."CartItems_CartItemID_seq" OWNED BY public."CartItems"."CartItemID";
          public          postgres    false    226            �            1259    24006    Carts    TABLE     �   CREATE TABLE public."Carts" (
    "CartID" integer NOT NULL,
    "UserID" integer,
    "DateCreated" timestamp with time zone
);
    DROP TABLE public."Carts";
       public         heap    postgres    false            �            1259    24005    Carts_CartID_seq    SEQUENCE     �   CREATE SEQUENCE public."Carts_CartID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Carts_CartID_seq";
       public          postgres    false    225            M           0    0    Carts_CartID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Carts_CartID_seq" OWNED BY public."Carts"."CartID";
          public          postgres    false    224            �            1259    23951 
   Categories    TABLE     �   CREATE TABLE public."Categories" (
    "CategoryID" integer NOT NULL,
    "CategoryName" character varying(255),
    "ParentID" integer
);
     DROP TABLE public."Categories";
       public         heap    postgres    false            �            1259    23950    Categories_CategoryID_seq    SEQUENCE     �   CREATE SEQUENCE public."Categories_CategoryID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Categories_CategoryID_seq";
       public          postgres    false    217            N           0    0    Categories_CategoryID_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Categories_CategoryID_seq" OWNED BY public."Categories"."CategoryID";
          public          postgres    false    216            �            1259    23989    OrderDetails    TABLE     �   CREATE TABLE public."OrderDetails" (
    "OrderDetailID" integer NOT NULL,
    "OrderID" integer,
    "ProductID" integer,
    "Quantity" integer,
    "Price" numeric(10,2)
);
 "   DROP TABLE public."OrderDetails";
       public         heap    postgres    false            �            1259    23988    OrderDetails_OrderDetailID_seq    SEQUENCE     �   CREATE SEQUENCE public."OrderDetails_OrderDetailID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."OrderDetails_OrderDetailID_seq";
       public          postgres    false    223            O           0    0    OrderDetails_OrderDetailID_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."OrderDetails_OrderDetailID_seq" OWNED BY public."OrderDetails"."OrderDetailID";
          public          postgres    false    222            �            1259    23977    Orders    TABLE     �   CREATE TABLE public."Orders" (
    "OrderID" integer NOT NULL,
    "UserID" integer,
    "OrderDate" timestamp with time zone,
    "TotalAmount" numeric(10,2),
    "Status" character varying(255)
);
    DROP TABLE public."Orders";
       public         heap    postgres    false            �            1259    23976    Orders_OrderID_seq    SEQUENCE     �   CREATE SEQUENCE public."Orders_OrderID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Orders_OrderID_seq";
       public          postgres    false    221            P           0    0    Orders_OrderID_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Orders_OrderID_seq" OWNED BY public."Orders"."OrderID";
          public          postgres    false    220            �            1259    23963    Products    TABLE     +  CREATE TABLE public."Products" (
    "ProductID" integer NOT NULL,
    "ProductName" character varying(255),
    "Description" text,
    "Price" numeric(10,2),
    "StockQuantity" integer,
    "CategoryID" integer,
    "ImageURL" character varying(255),
    "Discount" integer,
    "Detail" text
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    23962    Products_ProductID_seq    SEQUENCE     �   CREATE SEQUENCE public."Products_ProductID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Products_ProductID_seq";
       public          postgres    false    219            Q           0    0    Products_ProductID_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Products_ProductID_seq" OWNED BY public."Products"."ProductID";
          public          postgres    false    218            �            1259    24035 	   TokenLogs    TABLE     T  CREATE TABLE public."TokenLogs" (
    "TokenLogID" integer NOT NULL,
    "Token" character varying(255),
    "IssuedToSystem" character varying(255),
    "IssuedDate" timestamp with time zone,
    "ExpiryDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."TokenLogs";
       public         heap    postgres    false            �            1259    24034    TokenLogs_TokenLogID_seq    SEQUENCE     �   CREATE SEQUENCE public."TokenLogs_TokenLogID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."TokenLogs_TokenLogID_seq";
       public          postgres    false    229            R           0    0    TokenLogs_TokenLogID_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."TokenLogs_TokenLogID_seq" OWNED BY public."TokenLogs"."TokenLogID";
          public          postgres    false    228            �            1259    23942    Users    TABLE     N  CREATE TABLE public."Users" (
    "UserID" integer NOT NULL,
    "Username" character varying(255),
    "PasswordHash" character varying(255),
    "FullName" character varying(255),
    "Email" character varying(255),
    "Address" character varying(255),
    "DateOfBirth" timestamp with time zone,
    "Gender" character varying(255),
    "PhoneNumber" character varying(255),
    "isAdmin" boolean,
    "AuthenticationType" character varying(255),
    "AuthProviderID" character varying(255),
    "AuthProviderToken" character varying(255),
    "DateCreated" timestamp with time zone
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    23941    Users_UserID_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_UserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Users_UserID_seq";
       public          postgres    false    215            S           0    0    Users_UserID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_UserID_seq" OWNED BY public."Users"."UserID";
          public          postgres    false    214            �           2604    24021    CartItems CartItemID    DEFAULT     �   ALTER TABLE ONLY public."CartItems" ALTER COLUMN "CartItemID" SET DEFAULT nextval('public."CartItems_CartItemID_seq"'::regclass);
 G   ALTER TABLE public."CartItems" ALTER COLUMN "CartItemID" DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    24009    Carts CartID    DEFAULT     r   ALTER TABLE ONLY public."Carts" ALTER COLUMN "CartID" SET DEFAULT nextval('public."Carts_CartID_seq"'::regclass);
 ?   ALTER TABLE public."Carts" ALTER COLUMN "CartID" DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    23954    Categories CategoryID    DEFAULT     �   ALTER TABLE ONLY public."Categories" ALTER COLUMN "CategoryID" SET DEFAULT nextval('public."Categories_CategoryID_seq"'::regclass);
 H   ALTER TABLE public."Categories" ALTER COLUMN "CategoryID" DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    23992    OrderDetails OrderDetailID    DEFAULT     �   ALTER TABLE ONLY public."OrderDetails" ALTER COLUMN "OrderDetailID" SET DEFAULT nextval('public."OrderDetails_OrderDetailID_seq"'::regclass);
 M   ALTER TABLE public."OrderDetails" ALTER COLUMN "OrderDetailID" DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    23980    Orders OrderID    DEFAULT     v   ALTER TABLE ONLY public."Orders" ALTER COLUMN "OrderID" SET DEFAULT nextval('public."Orders_OrderID_seq"'::regclass);
 A   ALTER TABLE public."Orders" ALTER COLUMN "OrderID" DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    23966    Products ProductID    DEFAULT     ~   ALTER TABLE ONLY public."Products" ALTER COLUMN "ProductID" SET DEFAULT nextval('public."Products_ProductID_seq"'::regclass);
 E   ALTER TABLE public."Products" ALTER COLUMN "ProductID" DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    24038    TokenLogs TokenLogID    DEFAULT     �   ALTER TABLE ONLY public."TokenLogs" ALTER COLUMN "TokenLogID" SET DEFAULT nextval('public."TokenLogs_TokenLogID_seq"'::regclass);
 G   ALTER TABLE public."TokenLogs" ALTER COLUMN "TokenLogID" DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    23945    Users UserID    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN "UserID" SET DEFAULT nextval('public."Users_UserID_seq"'::regclass);
 ?   ALTER TABLE public."Users" ALTER COLUMN "UserID" DROP DEFAULT;
       public          postgres    false    214    215    215            C          0    24018 	   CartItems 
   TABLE DATA           V   COPY public."CartItems" ("CartItemID", "CartID", "ProductID", "Quantity") FROM stdin;
    public          postgres    false    227   U       A          0    24006    Carts 
   TABLE DATA           D   COPY public."Carts" ("CartID", "UserID", "DateCreated") FROM stdin;
    public          postgres    false    225   "U       9          0    23951 
   Categories 
   TABLE DATA           P   COPY public."Categories" ("CategoryID", "CategoryName", "ParentID") FROM stdin;
    public          postgres    false    217   ?U       ?          0    23989    OrderDetails 
   TABLE DATA           f   COPY public."OrderDetails" ("OrderDetailID", "OrderID", "ProductID", "Quantity", "Price") FROM stdin;
    public          postgres    false    223   �U       =          0    23977    Orders 
   TABLE DATA           ]   COPY public."Orders" ("OrderID", "UserID", "OrderDate", "TotalAmount", "Status") FROM stdin;
    public          postgres    false    221   �U       ;          0    23963    Products 
   TABLE DATA           �   COPY public."Products" ("ProductID", "ProductName", "Description", "Price", "StockQuantity", "CategoryID", "ImageURL", "Discount", "Detail") FROM stdin;
    public          postgres    false    219   �U       E          0    24035 	   TokenLogs 
   TABLE DATA           �   COPY public."TokenLogs" ("TokenLogID", "Token", "IssuedToSystem", "IssuedDate", "ExpiryDate", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   �U       7          0    23942    Users 
   TABLE DATA           �   COPY public."Users" ("UserID", "Username", "PasswordHash", "FullName", "Email", "Address", "DateOfBirth", "Gender", "PhoneNumber", "isAdmin", "AuthenticationType", "AuthProviderID", "AuthProviderToken", "DateCreated") FROM stdin;
    public          postgres    false    215   V       T           0    0    CartItems_CartItemID_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."CartItems_CartItemID_seq"', 1, false);
          public          postgres    false    226            U           0    0    Carts_CartID_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Carts_CartID_seq"', 1, false);
          public          postgres    false    224            V           0    0    Categories_CategoryID_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Categories_CategoryID_seq"', 8, true);
          public          postgres    false    216            W           0    0    OrderDetails_OrderDetailID_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."OrderDetails_OrderDetailID_seq"', 1, false);
          public          postgres    false    222            X           0    0    Orders_OrderID_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Orders_OrderID_seq"', 1, false);
          public          postgres    false    220            Y           0    0    Products_ProductID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Products_ProductID_seq"', 1, false);
          public          postgres    false    218            Z           0    0    TokenLogs_TokenLogID_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."TokenLogs_TokenLogID_seq"', 1, false);
          public          postgres    false    228            [           0    0    Users_UserID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Users_UserID_seq"', 4, true);
          public          postgres    false    214            �           2606    24023    CartItems CartItems_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "CartItems_pkey" PRIMARY KEY ("CartItemID");
 F   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "CartItems_pkey";
       public            postgres    false    227            �           2606    24011    Carts Carts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "Carts_pkey" PRIMARY KEY ("CartID");
 >   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "Carts_pkey";
       public            postgres    false    225            �           2606    23956    Categories Categories_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryID");
 H   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_pkey";
       public            postgres    false    217            �           2606    23994    OrderDetails OrderDetails_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."OrderDetails"
    ADD CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("OrderDetailID");
 L   ALTER TABLE ONLY public."OrderDetails" DROP CONSTRAINT "OrderDetails_pkey";
       public            postgres    false    223            �           2606    23982    Orders Orders_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID");
 @   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_pkey";
       public            postgres    false    221            �           2606    23970    Products Products_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID");
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    219            �           2606    24042    TokenLogs TokenLogs_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."TokenLogs"
    ADD CONSTRAINT "TokenLogs_pkey" PRIMARY KEY ("TokenLogID");
 F   ALTER TABLE ONLY public."TokenLogs" DROP CONSTRAINT "TokenLogs_pkey";
       public            postgres    false    229            �           2606    23949    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    215            �           2606    24024    CartItems CartItems_CartID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "CartItems_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES public."Carts"("CartID") ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "CartItems_CartID_fkey";
       public          postgres    false    225    227    3227            �           2606    24029 "   CartItems CartItems_ProductID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CartItems"
    ADD CONSTRAINT "CartItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES public."Products"("ProductID") ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."CartItems" DROP CONSTRAINT "CartItems_ProductID_fkey";
       public          postgres    false    219    227    3221            �           2606    24012    Carts Carts_UserID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "Carts_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("UserID") ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "Carts_UserID_fkey";
       public          postgres    false    225    3217    215            �           2606    23957 #   Categories Categories_ParentID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_ParentID_fkey" FOREIGN KEY ("ParentID") REFERENCES public."Categories"("CategoryID") ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_ParentID_fkey";
       public          postgres    false    217    3219    217            �           2606    23995 &   OrderDetails OrderDetails_OrderID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderDetails"
    ADD CONSTRAINT "OrderDetails_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES public."Orders"("OrderID") ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."OrderDetails" DROP CONSTRAINT "OrderDetails_OrderID_fkey";
       public          postgres    false    223    221    3223            �           2606    24000 (   OrderDetails OrderDetails_ProductID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderDetails"
    ADD CONSTRAINT "OrderDetails_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES public."Products"("ProductID") ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."OrderDetails" DROP CONSTRAINT "OrderDetails_ProductID_fkey";
       public          postgres    false    219    3221    223            �           2606    23983    Orders Orders_UserID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("UserID") ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_UserID_fkey";
       public          postgres    false    3217    215    221            �           2606    23971 !   Products Products_CategoryID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES public."Categories"("CategoryID") ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_CategoryID_fkey";
       public          postgres    false    219    217    3219            C      x������ � �      A      x������ � �      9   U   x�3�<2!����<������fr��qq�$����Ɯ��V*�^�����p��t��	gHb�B^zF*�g�铟b��qqq j�      ?      x������ � �      =      x������ � �      ;      x������ � �      E      x������ � �      7   8  x����N�@��ۧ�7�L��,�I�	�1&\���Q��x�<��1��X�{�M�&��x1�2��"���K��~���D��nӼ�����ڪ�+Wc?:�`�,8=�n�]�B^3�a;��.���*��* ����`*G�?��h�n�&yo�y�w�t��.�w�ɛ�|�n���ɫ��n�[j&E�
h�
Q� i�)A��R����>�5@K`qצ.�MGXzȠd�H��:a�~V�W�Q4�s���~���{	�]f�L�eVʖ0md>�}����- {�gl�v�a| U&�e     