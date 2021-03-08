test-wagtail:
	(cd wagtail && python manage.py test)

test-nextjs:
	echo "No tests atm"

build-wagtail-image:
	(cd wagtail && docker build -t docker.pkg.github.com/aldowntown/andreasfonsterputs/wagtail-andreasfonsterputs .)

build-nextjs-image:
	(cd nextjs && docker build -t docker.pkg.github.com/aldowntown/andreasfonsterputs/nextjs-andreasfonsterputs .)

build-images: build-wagtail-image build-nextjs-image

push-wagtail-image:
	docker tag docker.pkg.github.com/aldowntown/andreasfonsterputs/wagtail-andreasfonsterputs docker.pkg.github.com/aldowntown/andreasfonsterputs/wagtail-andreasfonsterputs:${VERSION}
	docker push docker.pkg.github.com/aldowntown/andreasfonsterputs/wagtail-andreasfonsterputs:${VERSION}

push-nextjs-image:
	docker tag docker.pkg.github.com/aldowntown/andreasfonsterputs/nextjs-andreasfonsterputs docker.pkg.github.com/aldowntown/andreasfonsterputs/nextjs-andreasfonsterputs:${VERSION}
	docker push docker.pkg.github.com/aldowntown/andreasfonsterputs/nextjs-andreasfonsterputs:${VERSION}