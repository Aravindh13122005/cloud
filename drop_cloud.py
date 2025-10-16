import dropbox
ACCESS_TOKEN = "sl.u.AGBvBIm1_wJe9IUep3J3vXl5sfnvwLZOXqkcqcf__LZwUc8YrsFtkht_uDnNA4wFPsb3Wyw2SMGFh8J8WYNpFbhX9jaBav_hw2tjjkCRSEAA0vvBjnldRpQPTix7I9DlEsLOAgKzlueRNlcUX3TTKf8krejNJ-JVL5Mj4eHtRX7kxBKAoShEfQzBxLSfmZE3QgA2fkjiTaZ0VvLGQp9hYrvXjbgcdN0SHS9NA8VG37_Awx1Ogmj2QLacuWV8d0UBn_MRnbu8nix4k_klF3WPehbZ7hZa7DWGb4mPlJOskzjnO7o3pv_4ywBGTDWnr_2SgKE3CcmPqV6GmBEb0jW6lm-paoLaIPE3WluSetVMog1cOTdlJr5dLzCXTRhLc6lSFa4I49dGT5B3JM1-Hbdg6n3qiVQdcddtKa5QJHd6nINmrRoT39OI641-y-zgTRpkTJSWh8fU91SDXJIyEhG5d41xh6t5qUlFdC_74GXsIcSjR7H29hYSu4LsDaOL59X1oplGeQV5peckNBuFFCsLjjltaA2s2vjEjYIob7JBFFtiYc4MHRx9axY5vCG8LiwbKwy1JsXbhh9_a8g_0aG0uwOO37g2UkpedUSzdkhgCFm2uI90mzZXZwOcgI4cA0bGYhkpgjJKVOfRwtS7dKZxGfimKhSHfNoMSKgdvWPTTsYm_GIh558kM_cJZNWV3jEnQ9ZnYqcUEPaj5niBaa_YSbH7vErOaPIyk6lN-qYfOr7MsC1oZ5HeExrCzeh_KmYRK6QPxE3A7TbMj1QOX_dbouEiUILPluiRyuzjo5x7C_1IdCrXVqOQPi9d0fh7Eqq66FrFopch1bLQSq4bhOzod1BkTkx7ZwSMA-bxgo5kNyarMkyIjB070lq5eygryv7UJmQlfV9U89pTQ0Rf9CeddaLQr-OIUkpM5l6XI1e2KxpZHj66UJxSZ97sgD9Th-F_n71aDzRRK8TE5zyS42XD6qFZaUbYXTjjKptgpMJCH8W4y6CAoSsi_Lp3PbHpxI1A1pMzsU3aUsMKq62Ul1WSY6PjVv-Mwy0kzEj2dq-WNsrdOdJ2Hx-fU2LGdJMlHnmP-H_Sl8yqvt8CVif5qyOs3qcARPq3weVO8ZBsX1s9s7VeF7sM0GLcpw6FqLn5DnCiqUMUeKE0iXUJiyygjb81_fE00QiolwdVYOdOhZtMSQxZqr3SEx3j_0ejUSaRqNhWugf_NaYPMGaY3j18P9l-ESliFrkxYreVXTmvRVk1eypFJd3v2RLYyuKRP_MHxmRfu7h6Mz8zyLr6Y7wvu3tZJKi3IOjX1Gjm4S5ZRnTQ3ZaSwjX3gaD6rnTlcm67rHVsmrkWVohjbWlo0p7VKip4WdbFU_CDcofwyduLQajn51qzqDmWsuhfvygFivkDtxp0n8KRCvzg6dfa8w18WLV9JH-I"
dbx = dropbox.Dropbox(ACCESS_TOKEN)
print("Files in Dropbox root:")
for entry in dbx.files_list_folder("").entries:
    print("-", entry.name)
file_path = "example.txt"  # The local file you want to upload
with open(file_path, "rb") as f:
    dbx.files_upload(
        f.read(),                  # File data (binary mode)
        f"/{file_path}",           # Destination path in Dropbox
        mode=dropbox.files.WriteMode.overwrite  # Overwrite if exists
    )
print(f"Uploaded: {file_path}")
download_path = "downloaded_example.txt"  # Local download file name
dbx.files_download_to_file(
    download_path,               # Local path to save the file
    f"/{file_path}"              # Dropbox file path to download
)
print(f"Downloaded to: {download_path}")