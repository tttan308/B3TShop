PGDMP     &    2                 |            B3TShop    15.3    15.3 ^    s           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            t           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            u           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            v           1262    151959    B3TShop    DATABASE     �   CREATE DATABASE "B3TShop" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "B3TShop";
                postgres    false            �            1259    152085 	   auditlogs    TABLE     �  CREATE TABLE public.auditlogs (
    logid integer NOT NULL,
    transactionid integer,
    auditdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(255),
    createdby character varying(255),
    createdat timestamp without time zone,
    updatedby character varying(255),
    updatedat timestamp without time zone,
    actiondescription text
);
    DROP TABLE public.auditlogs;
       public         heap    postgres    false            �            1259    152084    auditlogs_logid_seq    SEQUENCE     �   CREATE SEQUENCE public.auditlogs_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.auditlogs_logid_seq;
       public          postgres    false    233            w           0    0    auditlogs_logid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.auditlogs_logid_seq OWNED BY public.auditlogs.logid;
          public          postgres    false    232            �            1259    151996    cart    TABLE     �   CREATE TABLE public.cart (
    cartid integer NOT NULL,
    userid integer NOT NULL,
    datecreated timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    151995    cart_cartid_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cartid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.cart_cartid_seq;
       public          postgres    false    221            x           0    0    cart_cartid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.cart_cartid_seq OWNED BY public.cart.cartid;
          public          postgres    false    220            �            1259    152011 	   cartitems    TABLE     �   CREATE TABLE public.cartitems (
    cartitemid integer NOT NULL,
    cartid integer NOT NULL,
    productid integer NOT NULL,
    quantity integer NOT NULL
);
    DROP TABLE public.cartitems;
       public         heap    postgres    false            �            1259    152010    cartitems_cartitemid_seq    SEQUENCE     �   CREATE SEQUENCE public.cartitems_cartitemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.cartitems_cartitemid_seq;
       public          postgres    false    223            y           0    0    cartitems_cartitemid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.cartitems_cartitemid_seq OWNED BY public.cartitems.cartitemid;
          public          postgres    false    222            �            1259    151973 
   categories    TABLE     �   CREATE TABLE public.categories (
    categoryid integer NOT NULL,
    categoryname character varying(255) NOT NULL,
    description text
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    151972    categories_categoryid_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_categoryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.categories_categoryid_seq;
       public          postgres    false    217            z           0    0    categories_categoryid_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.categories_categoryid_seq OWNED BY public.categories.categoryid;
          public          postgres    false    216            �            1259    152041    orderdetails    TABLE     �   CREATE TABLE public.orderdetails (
    orderdetailid integer NOT NULL,
    orderid integer NOT NULL,
    productid integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);
     DROP TABLE public.orderdetails;
       public         heap    postgres    false            �            1259    152040    orderdetails_orderdetailid_seq    SEQUENCE     �   CREATE SEQUENCE public.orderdetails_orderdetailid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.orderdetails_orderdetailid_seq;
       public          postgres    false    227            {           0    0    orderdetails_orderdetailid_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.orderdetails_orderdetailid_seq OWNED BY public.orderdetails.orderdetailid;
          public          postgres    false    226            �            1259    152028    orders    TABLE     �   CREATE TABLE public.orders (
    orderid integer NOT NULL,
    userid integer NOT NULL,
    orderdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    totalamount numeric(10,2) NOT NULL,
    status character varying(50)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    152027    orders_orderid_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_orderid_seq;
       public          postgres    false    225            |           0    0    orders_orderid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_orderid_seq OWNED BY public.orders.orderid;
          public          postgres    false    224            �            1259    152058    paymentaccounts    TABLE     �   CREATE TABLE public.paymentaccounts (
    accountid integer NOT NULL,
    userid integer NOT NULL,
    balance numeric(10,2) NOT NULL
);
 #   DROP TABLE public.paymentaccounts;
       public         heap    postgres    false            �            1259    152057    paymentaccounts_accountid_seq    SEQUENCE     �   CREATE SEQUENCE public.paymentaccounts_accountid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.paymentaccounts_accountid_seq;
       public          postgres    false    229            }           0    0    paymentaccounts_accountid_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.paymentaccounts_accountid_seq OWNED BY public.paymentaccounts.accountid;
          public          postgres    false    228            �            1259    151982    products    TABLE     �   CREATE TABLE public.products (
    productid integer NOT NULL,
    productname character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stockquantity integer NOT NULL,
    categoryid integer,
    imageurl text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    151981    products_productid_seq    SEQUENCE     �   CREATE SEQUENCE public.products_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.products_productid_seq;
       public          postgres    false    219            ~           0    0    products_productid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.products_productid_seq OWNED BY public.products.productid;
          public          postgres    false    218            �            1259    152100 	   tokenlogs    TABLE       CREATE TABLE public.tokenlogs (
    tokenlogid integer NOT NULL,
    token character varying(255) NOT NULL,
    issuedtosystem character varying(255),
    issueddate timestamp without time zone NOT NULL,
    expirydate timestamp without time zone NOT NULL
);
    DROP TABLE public.tokenlogs;
       public         heap    postgres    false            �            1259    152099    tokenlogs_tokenlogid_seq    SEQUENCE     �   CREATE SEQUENCE public.tokenlogs_tokenlogid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.tokenlogs_tokenlogid_seq;
       public          postgres    false    235                       0    0    tokenlogs_tokenlogid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.tokenlogs_tokenlogid_seq OWNED BY public.tokenlogs.tokenlogid;
          public          postgres    false    234            �            1259    152072    transactions    TABLE     �   CREATE TABLE public.transactions (
    transactionid integer NOT NULL,
    accountid integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    transactiondate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.transactions;
       public         heap    postgres    false            �            1259    152071    transactions_transactionid_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_transactionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.transactions_transactionid_seq;
       public          postgres    false    231            �           0    0    transactions_transactionid_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.transactions_transactionid_seq OWNED BY public.transactions.transactionid;
          public          postgres    false    230            �            1259    151961    users    TABLE     �  CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    passwordhash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    usertype character varying(50),
    authenticationtype character varying(50),
    authproviderid character varying(255),
    authprovidertoken character varying(255),
    datecreated timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    151960    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    215            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    214            �           2604    152088    auditlogs logid    DEFAULT     r   ALTER TABLE ONLY public.auditlogs ALTER COLUMN logid SET DEFAULT nextval('public.auditlogs_logid_seq'::regclass);
 >   ALTER TABLE public.auditlogs ALTER COLUMN logid DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    151999    cart cartid    DEFAULT     j   ALTER TABLE ONLY public.cart ALTER COLUMN cartid SET DEFAULT nextval('public.cart_cartid_seq'::regclass);
 :   ALTER TABLE public.cart ALTER COLUMN cartid DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    152014    cartitems cartitemid    DEFAULT     |   ALTER TABLE ONLY public.cartitems ALTER COLUMN cartitemid SET DEFAULT nextval('public.cartitems_cartitemid_seq'::regclass);
 C   ALTER TABLE public.cartitems ALTER COLUMN cartitemid DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    151976    categories categoryid    DEFAULT     ~   ALTER TABLE ONLY public.categories ALTER COLUMN categoryid SET DEFAULT nextval('public.categories_categoryid_seq'::regclass);
 D   ALTER TABLE public.categories ALTER COLUMN categoryid DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    152044    orderdetails orderdetailid    DEFAULT     �   ALTER TABLE ONLY public.orderdetails ALTER COLUMN orderdetailid SET DEFAULT nextval('public.orderdetails_orderdetailid_seq'::regclass);
 I   ALTER TABLE public.orderdetails ALTER COLUMN orderdetailid DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    152031    orders orderid    DEFAULT     p   ALTER TABLE ONLY public.orders ALTER COLUMN orderid SET DEFAULT nextval('public.orders_orderid_seq'::regclass);
 =   ALTER TABLE public.orders ALTER COLUMN orderid DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    152061    paymentaccounts accountid    DEFAULT     �   ALTER TABLE ONLY public.paymentaccounts ALTER COLUMN accountid SET DEFAULT nextval('public.paymentaccounts_accountid_seq'::regclass);
 H   ALTER TABLE public.paymentaccounts ALTER COLUMN accountid DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    151985    products productid    DEFAULT     x   ALTER TABLE ONLY public.products ALTER COLUMN productid SET DEFAULT nextval('public.products_productid_seq'::regclass);
 A   ALTER TABLE public.products ALTER COLUMN productid DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    152103    tokenlogs tokenlogid    DEFAULT     |   ALTER TABLE ONLY public.tokenlogs ALTER COLUMN tokenlogid SET DEFAULT nextval('public.tokenlogs_tokenlogid_seq'::regclass);
 C   ALTER TABLE public.tokenlogs ALTER COLUMN tokenlogid DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    152075    transactions transactionid    DEFAULT     �   ALTER TABLE ONLY public.transactions ALTER COLUMN transactionid SET DEFAULT nextval('public.transactions_transactionid_seq'::regclass);
 I   ALTER TABLE public.transactions ALTER COLUMN transactionid DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    151964    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    214    215    215            n          0    152085 	   auditlogs 
   TABLE DATA           �   COPY public.auditlogs (logid, transactionid, auditdate, status, createdby, createdat, updatedby, updatedat, actiondescription) FROM stdin;
    public          postgres    false    233    r       b          0    151996    cart 
   TABLE DATA           ;   COPY public.cart (cartid, userid, datecreated) FROM stdin;
    public          postgres    false    221   =r       d          0    152011 	   cartitems 
   TABLE DATA           L   COPY public.cartitems (cartitemid, cartid, productid, quantity) FROM stdin;
    public          postgres    false    223   Zr       ^          0    151973 
   categories 
   TABLE DATA           K   COPY public.categories (categoryid, categoryname, description) FROM stdin;
    public          postgres    false    217   wr       h          0    152041    orderdetails 
   TABLE DATA           Z   COPY public.orderdetails (orderdetailid, orderid, productid, quantity, price) FROM stdin;
    public          postgres    false    227   �r       f          0    152028    orders 
   TABLE DATA           Q   COPY public.orders (orderid, userid, orderdate, totalamount, status) FROM stdin;
    public          postgres    false    225   �r       j          0    152058    paymentaccounts 
   TABLE DATA           E   COPY public.paymentaccounts (accountid, userid, balance) FROM stdin;
    public          postgres    false    229   �r       `          0    151982    products 
   TABLE DATA           s   COPY public.products (productid, productname, description, price, stockquantity, categoryid, imageurl) FROM stdin;
    public          postgres    false    219   �r       p          0    152100 	   tokenlogs 
   TABLE DATA           ^   COPY public.tokenlogs (tokenlogid, token, issuedtosystem, issueddate, expirydate) FROM stdin;
    public          postgres    false    235   s       l          0    152072    transactions 
   TABLE DATA           Y   COPY public.transactions (transactionid, accountid, amount, transactiondate) FROM stdin;
    public          postgres    false    231   %s       \          0    151961    users 
   TABLE DATA           �   COPY public.users (userid, username, passwordhash, email, usertype, authenticationtype, authproviderid, authprovidertoken, datecreated) FROM stdin;
    public          postgres    false    215   Bs       �           0    0    auditlogs_logid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.auditlogs_logid_seq', 1, false);
          public          postgres    false    232            �           0    0    cart_cartid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.cart_cartid_seq', 1, false);
          public          postgres    false    220            �           0    0    cartitems_cartitemid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.cartitems_cartitemid_seq', 1, false);
          public          postgres    false    222            �           0    0    categories_categoryid_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.categories_categoryid_seq', 1, false);
          public          postgres    false    216            �           0    0    orderdetails_orderdetailid_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.orderdetails_orderdetailid_seq', 1, false);
          public          postgres    false    226            �           0    0    orders_orderid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_orderid_seq', 1, false);
          public          postgres    false    224            �           0    0    paymentaccounts_accountid_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.paymentaccounts_accountid_seq', 1, false);
          public          postgres    false    228            �           0    0    products_productid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_productid_seq', 1, false);
          public          postgres    false    218            �           0    0    tokenlogs_tokenlogid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.tokenlogs_tokenlogid_seq', 1, false);
          public          postgres    false    234            �           0    0    transactions_transactionid_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.transactions_transactionid_seq', 1, false);
          public          postgres    false    230            �           0    0    users_userid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_userid_seq', 1, false);
          public          postgres    false    214            �           2606    152093    auditlogs auditlogs_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.auditlogs
    ADD CONSTRAINT auditlogs_pkey PRIMARY KEY (logid);
 B   ALTER TABLE ONLY public.auditlogs DROP CONSTRAINT auditlogs_pkey;
       public            postgres    false    233            �           2606    152002    cart cart_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cartid);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    221            �           2606    152004    cart cart_userid_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_userid_key UNIQUE (userid);
 >   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_userid_key;
       public            postgres    false    221            �           2606    152016    cartitems cartitems_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_pkey PRIMARY KEY (cartitemid);
 B   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_pkey;
       public            postgres    false    223            �           2606    151980    categories categories_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (categoryid);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    217            �           2606    152046    orderdetails orderdetails_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (orderdetailid);
 H   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_pkey;
       public            postgres    false    227            �           2606    152034    orders orders_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    225            �           2606    152063 $   paymentaccounts paymentaccounts_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.paymentaccounts
    ADD CONSTRAINT paymentaccounts_pkey PRIMARY KEY (accountid);
 N   ALTER TABLE ONLY public.paymentaccounts DROP CONSTRAINT paymentaccounts_pkey;
       public            postgres    false    229            �           2606    152065 *   paymentaccounts paymentaccounts_userid_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.paymentaccounts
    ADD CONSTRAINT paymentaccounts_userid_key UNIQUE (userid);
 T   ALTER TABLE ONLY public.paymentaccounts DROP CONSTRAINT paymentaccounts_userid_key;
       public            postgres    false    229            �           2606    151989    products products_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (productid);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    219            �           2606    152107    tokenlogs tokenlogs_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tokenlogs
    ADD CONSTRAINT tokenlogs_pkey PRIMARY KEY (tokenlogid);
 B   ALTER TABLE ONLY public.tokenlogs DROP CONSTRAINT tokenlogs_pkey;
       public            postgres    false    235            �           2606    152078    transactions transactions_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transactionid);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    231            �           2606    151971    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    151969    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    152094 &   auditlogs auditlogs_transactionid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.auditlogs
    ADD CONSTRAINT auditlogs_transactionid_fkey FOREIGN KEY (transactionid) REFERENCES public.transactions(transactionid);
 P   ALTER TABLE ONLY public.auditlogs DROP CONSTRAINT auditlogs_transactionid_fkey;
       public          postgres    false    233    231    3262            �           2606    152005    cart cart_userid_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 ?   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_userid_fkey;
       public          postgres    false    3242    221    215            �           2606    152017    cartitems cartitems_cartid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_cartid_fkey FOREIGN KEY (cartid) REFERENCES public.cart(cartid);
 I   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_cartid_fkey;
       public          postgres    false    3248    221    223            �           2606    152022 "   cartitems cartitems_productid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(productid);
 L   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_productid_fkey;
       public          postgres    false    223    219    3246            �           2606    152047 &   orderdetails orderdetails_orderid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.orders(orderid);
 P   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_orderid_fkey;
       public          postgres    false    225    3254    227            �           2606    152052 (   orderdetails orderdetails_productid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(productid);
 R   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_productid_fkey;
       public          postgres    false    227    219    3246            �           2606    152035    orders orders_userid_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_userid_fkey;
       public          postgres    false    215    225    3242            �           2606    152066 +   paymentaccounts paymentaccounts_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paymentaccounts
    ADD CONSTRAINT paymentaccounts_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 U   ALTER TABLE ONLY public.paymentaccounts DROP CONSTRAINT paymentaccounts_userid_fkey;
       public          postgres    false    3242    215    229            �           2606    151990 !   products products_categoryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.categories(categoryid);
 K   ALTER TABLE ONLY public.products DROP CONSTRAINT products_categoryid_fkey;
       public          postgres    false    3244    219    217            �           2606    152079 (   transactions transactions_accountid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_accountid_fkey FOREIGN KEY (accountid) REFERENCES public.paymentaccounts(accountid);
 R   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_accountid_fkey;
       public          postgres    false    231    3258    229            n      x������ � �      b      x������ � �      d      x������ � �      ^      x������ � �      h      x������ � �      f      x������ � �      j      x������ � �      `      x������ � �      p      x������ � �      l      x������ � �      \      x������ � �     