from liqpay import LiqPay
import sys
import os
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# public_key = 'sandbox_i98441757663'
public_key = os.environ.get('PUBLIC_KEY')
private_key = os.environ.get("PRIVATE_KEY")

liqpay = LiqPay(public_key, private_key)

payment_id = sys.argv[1]

params = {
    'action': 'status',
    'version': '3',
    'order_id': payment_id
}

# выполнение запроса
response = liqpay.api('request', params)
print(response)
