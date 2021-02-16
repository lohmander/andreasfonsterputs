test-wagtail:
	(cd wagtail && python manage.py test)

test-nextjs:
	echo "No tests atm"

build-wagtail-image:
	(cd wagtail && docker build -t docker.pkg.github.com/aldowntown/northprojects-solutions/wagtail-northprojects-solutions .)

build-nextjs-image:
	(cd nextjs && docker build -t docker.pkg.github.com/aldowntown/northprojects-solutions/nextjs-northprojects-solutions .)

build-images: build-wagtail-image build-nextjs-image

push-wagtail-image:
	docker tag docker.pkg.github.com/aldowntown/northprojects-solutions/wagtail-northprojects-solutions docker.pkg.github.com/aldowntown/northprojects-solutions/wagtail-northprojects-solutions:${VERSION}
	docker push docker.pkg.github.com/aldowntown/northprojects-solutions/wagtail-northprojects-solutions:${VERSION}

push-nextjs-image:
	docker tag docker.pkg.github.com/aldowntown/northprojects-solutions/nextjs-northprojects-solutions docker.pkg.github.com/aldowntown/northprojects-solutions/nextjs-northprojects-solutions:${VERSION}
	docker push docker.pkg.github.com/aldowntown/northprojects-solutions/nextjs-northprojects-solutions:${VERSION}