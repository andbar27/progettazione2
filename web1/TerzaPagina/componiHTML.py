head = """
<!DOCTYPE html>
<html>
    <head>
        <!--    CON QUESTE 3 RIGHE IMPORTI BOOTSTRAP!!  -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
        <style>
            div.col {
                margin-bottom: 3%;
            }
            p.card-text {
                color: red;
            }
        </style>
    </head>

    <body style="text-align: center;">
        <h1>HELLO WORLD</h1>
        <div class="container text-center">
            <div class="row row-cols-3">
"""

scheda ="""
                <div class="col">
                    <div class="card" style="width: 18rem;">
                        <img src="img/cane-di-razza.jpg" class="card-img-top" alt="cane-di-razza" width="400" height="300">
                        <div class="card-body">
                            <h5 class="card-title">Cane di razza</h5>
                            <p class="card-text">Good boy, brown dog, race: boh</p>
                            <a href="#" class="btn btn-primary">Go Dog Go</a>
                        </div>
                    </div>
                </div>"""

ended = """
            </div>
        </div>
        
    </body>
</html>"""

n = int(input())

print(head)
for i in range(n):
    print(scheda)
print(ended)